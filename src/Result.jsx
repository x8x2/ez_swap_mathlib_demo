import { JsonEditor as Editor } from 'jsoneditor-react';
function Result({priceJson}) {

  return (
    <div>
      <h3>Result</h3>
      <Editor
        value={priceJson}
      />
    </div>
  );
}

export default Result;
