let port = null;

export async function connectESP32() {

  try {

    port =
      await navigator.serial.requestPort();

    await port.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      flowControl: 'none'
    });

    return true;

  }

  catch (error) {

    console.log(error);

    return false;

  }

}


export async function readESP32Data(
  callback
) {

  if (!port) return;

  const decoder =
    new TextDecoderStream();

  port.readable.pipeTo(
    decoder.writable
  );

  const reader =
    decoder.readable.getReader();

  let buffer = '';

  while (true) {

    const { value, done } =
      await reader.read();

    if (done) break;

    buffer += value;

    if (buffer.includes('\n')) {

      const lines =
        buffer.split('\n');

      buffer =
        lines.pop();

      lines.forEach((line) => {

        callback(line.trim());

      });

    }

  }

}