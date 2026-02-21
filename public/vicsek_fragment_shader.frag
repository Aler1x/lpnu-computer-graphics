#version 300 es

precision highp float;

out vec4 outColor;

uniform float width;
uniform float height;
uniform int iterations;
uniform vec3 fractalColor;
uniform float zoom;
uniform vec2 center;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(width, height);
  uv.y = 1.0 - uv.y;

  vec2 world = (uv - 0.5) / zoom + 0.5 + center;

  if (world.x < 0.0 || world.x > 1.0 || world.y < 0.0 || world.y > 1.0) {
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 p = world;

  for (int k = 0; k < 10; k++) {
    if (k >= iterations) break;
    float cx = floor(p.x * 3.0);
    float cy = floor(p.y * 3.0);
    int i = int(cx);
    int j = int(cy);
    if ((i + j) % 2 != 0) {
      outColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    p = fract(p * 3.0);
  }

  outColor = vec4(fractalColor, 1.0);
}
