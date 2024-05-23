function useDocument() {
  let doc: Document | undefined = undefined;
  if (!(typeof document === 'undefined')) {
    doc = document;
  }

  return doc;
}

export default useDocument;
