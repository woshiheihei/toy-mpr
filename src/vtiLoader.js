import readFile from "itk/readFile";

const loadImageData = async function (url) {
  const arrayBuffer = await vtkHttpDataAccessHelper.fetchBinary(url, {
    progressCallback: (data) => console.log(data),
  });
  let file = new File(
    [new Blob([arrayBuffer])],
    "Segmentation preview.seg.nrrd"
  );
  console.log("file: ", file);

  let { image, mesh, polyData, webWorker } = await readFile(null, file);
  webWorker.terminate();

  const dimensions = image.size;
  const spacing = image.spacing;
  const imageData = new Uint8Array(image.data);
  return { dimensions, spacing, imageData };
};

export { loadImageData };
