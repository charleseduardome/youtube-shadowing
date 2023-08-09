export const getDataVideo = () => {
  const input = document.getElementById("input-url-video-to-transcription") as HTMLInputElement;
  const value = 
    input.value.split('?feature=share').length 
    ? input.value.split('?feature=share')[0] 
    : input.value
  
  if (value && (value.includes('watch?v=') || value.includes('shorts/'))) {
    const id = input.value.split('watch?v=')[1] || input.value.split('shorts/')[1];

    return { id }
  }

  const id = input.value.split('be/')[1];

  return { id }
}