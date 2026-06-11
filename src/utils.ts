//  Prevent running in DXP editor environment
export function isEditorEnv(): boolean {
  return window.location.pathname.includes('editor.html');
}
