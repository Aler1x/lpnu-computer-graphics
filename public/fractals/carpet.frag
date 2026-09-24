#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 u_resolution;
uniform int u_iterations;
uniform vec3 u_color;
uniform float u_zoom;
uniform vec2 u_center;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec2 world = uv / max(u_zoom, 0.0001) + u_center + 0.5;
  vec3 paper = vec3(0.96, 0.94, 0.90);

  if (world.x < 0.0 || world.x > 1.0 || world.y < 0.0 || world.y > 1.0) {
    outColor = vec4(paper, 1.0);
    return;
  }

  vec2 p = world;
  for (int k = 0; k < 8; k++) {
    if (k >= u_iterations) break;
    vec2 cell = floor(p * 3.0);
    if (cell.x == 1.0 && cell.y == 1.0) {
      outColor = vec4(paper, 1.0);
      return;
    }
    p = fract(p * 3.0);
  }

  vec3 ink = mix(vec3(0.16, 0.13, 0.08), u_color, 0.78);
  outColor = vec4(ink, 1.0);
}
