import ArrayBufferConverter from '../arraybufferconverter';

function getBuffer(dataBuffer) {
  const data = dataBuffer;

  return ((input) => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
}

test.each([
  '{"data":{"user":{"id":1,"name":"Teliom","level":10}}}',
  '{}',
  '{"data":{"user":{"id":1,"name":"Teliom","level":20}}}',
])(
  ('Testing class ArrayBufferConverter...'),
  (expected) => {
    const arrayBuffer = new ArrayBufferConverter();
    const data = getBuffer(expected);

    arrayBuffer.load(data);
    const recieved = arrayBuffer.toString();

    expect(expected).toEqual(recieved);
  },
);
