#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 u_resolution;
uniform int u_iterations;
uniform vec3 u_color;
uniform float u_zoom;
uniform vec2 u_center;
uniform vec2 u_param;
uniform int u_mode;

vec3 shade(float t) {
  vec3 band = 0.55 + 0.45 * cos(6.28318 * (vec3(t) + vec3(0.0, 0.16, 0.35)));
  return u_color * band * (0.35 + t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec2 plane = uv / max(u_zoom, 0.0001) + u_center;
  vec2 z = u_mode == 1 ? plane : vec2(0.0);
  vec2 c = u_mode == 1 ? u_param : plane;

  int n = 0;
  for (int i = 0; i < 250; i++) {
    if (i >= u_iterations) break;
    if (u_mode == 2) z = abs(z);
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    if (dot(z, z) > 16.0) break;
    n = i + 1;
  }

  if (n >= u_iterations) {
    outColor = vec4(0.015, 0.02, 0.035, 1.0);
    return;
  }

  float smoothN = float(n) + 1.0 - log2(log2(max(dot(z, z), 1.0001)));
  float t = clamp(smoothN / float(max(u_iterations, 1)), 0.0, 1.0);
  outColor = vec4(shade(t), 1.0);
}
