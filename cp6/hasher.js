function zaphodHash(str) {
  function rotateLeft(n, s) {
    return (n << s) | (n >>> (32 - s));
  }

  function addUnsigned(x, y) {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function utf8Encode(str) {
    str = str.replace(/\r\n/g, '\n');
    let utfText = '';
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode < 128) {
        utfText += String.fromCharCode(charCode);
      } else if (charCode < 2048) {
        utfText += String.fromCharCode((charCode >> 6) | 192);
        utfText += String.fromCharCode((charCode & 63) | 128);
      } else {
        utfText += String.fromCharCode((charCode >> 12) | 224);
        utfText += String.fromCharCode(((charCode >> 6) & 63) | 128);
        utfText += String.fromCharCode((charCode & 63) | 128);
      }
    }
    return utfText;
  }

  let blockstart;
  let i, j;
  let W = new Array(80);
  let H0 = 0x67452301;
  let H1 = 0xEFCDAB89;
  let H2 = 0x98BADCFE;
  let H3 = 0x10325476;
  let H4 = 0xC3D2E1F0;
  let A, B, C, D, E;
  let temp;

  str = utf8Encode(str);
  let strLength = str.length;
  let wordArray = [];
  for (i = 0; i < strLength - 3; i += 4) {
    j =
      (str.charCodeAt(i) << 24) |
      (str.charCodeAt(i + 1) << 16) |
      (str.charCodeAt(i + 2) << 8) |
      str.charCodeAt(i + 3);
    wordArray.push(j);
  }

  switch (strLength % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = (str.charCodeAt(strLength - 1) << 24) | 0x0800000;
      break;
    case 2:
      i =
        (str.charCodeAt(strLength - 2) << 24) |
        (str.charCodeAt(strLength - 1) << 16) |
        0x08000;
      break;
    case 3:
      i =
        (str.charCodeAt(strLength - 3) << 24) |
        (str.charCodeAt(strLength - 2) << 16) |
        (str.charCodeAt(strLength - 1) << 8) |
        0x80;
      break;
  }

  wordArray.push(i);

  while (wordArray.length % 16 !== 14) {
    wordArray.push(0);
  }

  wordArray.push(strLength >>> 29);
  wordArray.push((strLength << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = wordArray[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp =
        (rotateLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) &
        0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp =
        (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp =
        (rotateLeft(A, 5) +
          ((B & C) | (B & D) | (C & D)) +
          E +
          W[i] +
          0x8F1BBCDC) &
        0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp =
        (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  let hashHex =
    padZero(H0.toString(16), 8) +
    padZero(H1.toString(16), 8) +
    padZero(H2.toString(16), 8) +
    padZero(H3.toString(16), 8) +
    padZero(H4.toString(16), 8);

  return hashHex;
}

function padZero(str, len) {
  let zeros = '00000000000000000000000000000000';
  return (zeros + str).slice(-len);
}