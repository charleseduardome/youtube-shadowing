export const getDataVideo = () => {
  const YtRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
  const input = document.getElementById("input-url-video-to-transcription") as HTMLInputElement;

  const value = 
    input.value.split('?feature=share').length 
    ? input.value.split('?feature=share')[0] 
    : input.value

  
  if (value && (value.includes('watch?v='))) {
    const filteredURL = String(input.value.match(YtRegex))
    const id = filteredURL?.split('watch?v=')[1];

    return { id }
  }

  if (value && value.includes('shorts/')) {
    const id = input.value.split('shorts/')[1];

    return { id }
  }

  const id = input.value.split('be/')[1];

  return { id }
}