#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 u_resolution;
uniform int u_iterations;
uniform vec3 u_color;
uniform float u_zoom;
uniform vec2 u_center;

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void descend(inout vec2 a, inout vec2 b, vec2 p) {
  vec2 edge = b - a;
  vec2 third = edge / 3.0;
  vec2 p1 = a;
  vec2 p2 = a + third;
  vec2 p4 = a + third * 2.0;
  vec2 p5 = b;
  vec2 outward = normalize(vec2(edge.y, -edge.x));
  vec2 peak = a + third * 1.5 + outward * length(third) * 0.86602540378;

  vec2 s0a = p1; vec2 s0b = p2;
  vec2 s1a = p2; vec2 s1b = peak;
  vec2 s2a = peak; vec2 s2b = p4;
  vec2 s3a = p4; vec2 s3b = p5;
  float d0 = sdSegment(p, s0a, s0b);
  float d1 = sdSegment(p, s1a, s1b);
  float d2 = sdSegment(p, s2a, s2b);
  float d3 = sdSegment(p, s3a, s3b);
  float best = min(min(d0, d1), min(d2, d3));
  if (best == d0) { a = s0a; b = s0b; return; }
  if (best == d1) { a = s1a; b = s1b; return; }
  if (best == d2) { a = s2a; b = s2b; return; }
  a = s3a;
  b = s3b;
}

float edgeDistance(vec2 p, vec2 a, vec2 b, int iterations) {
  for (int i = 0; i < 8; i++) {
    if (i >= iterations) break;
    descend(a, b, p);
  }
  return sdSegment(p, a, b);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec2 p = uv / max(u_zoom, 0.0001) + u_center;
  vec2 a = vec2(0.0, 0.78);
  vec2 b = vec2(-0.72, -0.48);
  vec2 c = vec2(0.72, -0.48);

  float dist = min(
    edgeDistance(p, a, b, u_iterations),
    min(edgeDistance(p, b, c, u_iterations), edgeDistance(p, c, a, u_iterations))
  );

  vec3 paper = vec3(0.96, 0.94, 0.90);
  vec3 ink = mix(vec3(0.16, 0.13, 0.08), u_color, 0.78);
  float width = 0.012 / max(u_zoom, 0.35);
  float cover = 1.0 - smoothstep(width * 0.45, width, dist);
  outColor = vec4(mix(paper, ink, cover), 1.0);
}
