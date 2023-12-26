import {
    json,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData,
    unstable_createFileUploadHandler,
    unstable_composeUploadHandlers,
  } from "@remix-run/node";
  import type { NodeOnDiskFile } from "@remix-run/node";
  // import { useFetcher } from "@remix-run/react";

export async function uploadFilesAction(request: Request, directory: string) {
  console.log("directory", directory)
  let formData = await unstable_parseMultipartFormData(
      request,
      unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
          // Limit file upload to images
          filter({ contentType }) {
            console.log("CONTENTTYPE", contentType)
            return contentType.includes("image");
          },
          // Store the images in the public/img folder
          directory,
          // By default `unstable_createFileUploadHandler` add a number to the file
          // names if there's another with the same name, by disabling it we replace
          // the old file
          avoidFileConflicts: false,
          // Use the actual filename as the final filename
          file({ filename }) {
            console.log("FILENAME", filename)
            return filename;
          },
          // Limit the max size to 10MB
          maxPartSize: 10 * 1024 * 1024,
      }),
      unstable_createMemoryUploadHandler(),
      ),
  );

  console.log('formData', formData)

  let files = formData.getAll("file") as NodeOnDiskFile[];
  console.log("files", files)
  // return json({
  //     files: files.map((file) => ({ name: file.name, url: `${directory}/${file.name}` })),
  // });

  return null;
}



// export function useFileUpload() {
//     let { submit, data, state, formData } = useFetcher<typeof uploadFilesAction>();
//     let isUploading = state !== "idle";

//     let uploadingFiles = formData
//       ?.getAll("file")
//       ?.filter((value: unknown): value is File => value instanceof File)
//       .map((file) => {
//         let name = file.name;
//         // This line is important, this will create an Object URL, which is a `blob:` URL string
//         // We'll need this to render the image in the browser as it's being uploaded
//         let url = URL.createObjectURL(file);
//         return { name, url };
//       });
  
//     let images = (data?.files ?? []).concat(uploadingFiles ?? []);
  
//     return {
//       submit(files: FileList | null) {
//         if (!files) return;
//         let formData = new FormData();
//         for (let file of files) formData.append("file", file);
//         submit(formData, { method: "POST", encType: "multipart/form-data" });
//       },
//       isUploading,
//       images,
//     };
//   }

  // export function useFileUpload() {
  //   const [images, setImages] = useState<{name: string, url: string}[]>([]);

  //   const handleUploadFiles = async (files: FileList | null) => {
  //     if (!files) return;
  //     let formData = new FormData();
  //     for (let file of files) formData.append("file", file);
  //     let response = await fetch("/upload", {
  //         method: "POST",
  //         body: formData,
  //     });
  //     let json = await response.json();

  //     setImages(json.files);

  //     for (let file of files) {
  //       if (!(file instanceof File)) {
  //         continue;
  //       }

  //       setImages((prev) => {
  //         return [...prev, {name: file.name, url: URL.createObjectURL(file)}]
  //       })
  //     }
  //   };

  //   return {
  //     handleUploadFiles,
  //     images,
  //   };
  // }
