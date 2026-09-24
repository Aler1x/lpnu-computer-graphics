#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 u_resolution;
uniform int u_iterations;
uniform vec3 u_color;
uniform float u_zoom;
uniform vec2 u_center;

struct Hit {
  vec2 a;
  vec2 b;
  float dist;
};

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

void descend(inout vec2 a, inout vec2 b, vec2 p) {
  vec2 edge = b - a;
  vec2 third = edge / 3.0;
  vec2 q1 = a + third;
  vec2 q2 = a + third * 2.0;
  vec2 outward = normalize(vec2(edge.y, -edge.x));
  vec2 peak = a + third * 1.5 + outward * length(third) * 0.86602540378;

  vec2 a0 = a;    vec2 b0 = q1;
  vec2 a1 = q1;   vec2 b1 = peak;
  vec2 a2 = peak; vec2 b2 = q2;
  vec2 a3 = q2;   vec2 b3 = b;

  float d0 = sdSegment(p, a0, b0);
  float d1 = sdSegment(p, a1, b1);
  float d2 = sdSegment(p, a2, b2);
  float d3 = sdSegment(p, a3, b3);

  if (d0 <= d1 && d0 <= d2 && d0 <= d3) { a = a0; b = b0; return; }
  if (d1 <= d2 && d1 <= d3) { a = a1; b = b1; return; }
  if (d2 <= d3) { a = a2; b = b2; return; }
  a = a3;
  b = b3;
}

Hit refine(vec2 p, vec2 a, vec2 b, int iterations) {
  for (int i = 0; i < 8; i++) {
    if (i >= iterations) break;
    descend(a, b, p);
  }
  return Hit(a, b, sdSegment(p, a, b));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec2 p = uv / max(u_zoom, 0.0001) + u_center;

  vec2 v0 = vec2(0.0, 0.78);
  vec2 v1 = vec2(-0.72, -0.48);
  vec2 v2 = vec2(0.72, -0.48);

  Hit h0 = refine(p, v0, v1, u_iterations);
  Hit h1 = refine(p, v1, v2, u_iterations);
  Hit h2 = refine(p, v2, v0, u_iterations);
  float dist = min(h0.dist, min(h1.dist, h2.dist));
  float px = max(fwidth(dist), 1e-4);
  float cover = 1.0 - smoothstep(px * 0.75, px * 1.75, dist);

  vec3 paper = vec3(0.96, 0.94, 0.90);
  vec3 ink = mix(vec3(0.12, 0.1, 0.08), u_color, 0.86);
  outColor = vec4(mix(paper, ink, cover), 1.0);
}
