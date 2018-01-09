// repeatedly sample a uniform distribution to get something gaussian
// https://stackoverflow.com/a/39187274
export default function gaussianRandom(samples = 6) {
  let rand = 0;
  for (let i = 0; i < samples; i += 1) {
    rand += Math.random();
  }
  return rand / samples;
}
