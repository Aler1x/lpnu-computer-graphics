#version 300 es

precision highp float;

out vec4 outColor;

uniform float width;
uniform float height;
uniform int iterations;
uniform vec3 fractalColor;
uniform float zoom;
uniform vec2 center;

bool inSet(vec2 world) {
  if (world.x < 0.0 || world.x > 1.0 || world.y < 0.0 || world.y > 1.0) {
    return false;
  }

  vec2 p = world;
  for (int k = 0; k < 10; k++) {
    if (k >= iterations) break;
    int i = int(floor(p.x * 3.0));
    int j = int(floor(p.y * 3.0));
    if ((i + j) % 2 != 0) return false;
    p = fract(p * 3.0);
  }
  return true;
}

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(width, height);
  uv.y = 1.0 - uv.y;
  vec2 world = (uv - 0.5) / zoom + 0.5 + center;

  vec2 pixel = vec2(1.15 / max(width, 1.0), 1.15 / max(height, 1.0)) / max(zoom, 0.001);
  float cover = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 samplePoint = world + pixel * vec2(float(x), float(y));
      if (inSet(samplePoint)) {
        float weight = (x == 0 && y == 0) ? 1.0 : 0.55;
        cover = max(cover, weight);
      }
    }
  }

  vec3 paper = vec3(0.96, 0.94, 0.90);
  vec3 ink = mix(vec3(0.16, 0.13, 0.08), fractalColor, 0.78);
  outColor = vec4(mix(paper, ink, cover), 1.0);
}
