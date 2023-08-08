export const getDataVideo = () => {
  const input = document.getElementById("input-url-video-to-transcription") as HTMLInputElement;
  const id = input.value.split('watch?v=')[1] || input.value.split('shorts/')[1];

  const url = input.value;

  return { id, url }
}