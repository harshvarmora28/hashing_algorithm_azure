var md5 = require("md5");

function md5H(input) {
  const rotateLeft = (value, shift) =>
    (value << shift) | (value >>> (32 - shift));
  const addUnsigned = (x, y) => {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };

  const hexChars = "0123456789abcdef";
  const appendHex = (value) => {
    let output = "";
    for (let i = 0; i < 4; i++) {
      output +=
        hexChars.charAt((value >> (i * 8 + 4)) & 0x0f) +
        hexChars.charAt((value >> (i * 8)) & 0x0f);
    }
    return output;
  };

  const md5cycle = (x, k) => {
    let a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

    a += ((b & c) | (~b & d)) + k[0] + 0xd76aa478;
    a = rotateLeft(a, 7);
    a += b;
    d += ((a & b) | (~a & c)) + k[1] + 0xe8c7b756;
    d = rotateLeft(d, 12);
    d += a;
    c += ((d & a) | (~d & b)) + k[2] + 0x242070db;
    c = rotateLeft(c, 17);
    c += d;
    b += ((c & d) | (~c & a)) + k[3] + 0xc1bdceee;
    b = rotateLeft(b, 22);
    b += c;

    a += ((b & c) | (~b & d)) + k[4] + 0xf57c0faf;
    a = rotateLeft(a, 7);
    a += b;
    d += ((a & b) | (~a & c)) + k[5] + 0x4787c62a;
    d = rotateLeft(d, 12);
    d += a;
    c += ((d & a) | (~d & b)) + k[6] + 0xa8304613;
    c = rotateLeft(c, 17);
    c += d;
    b += ((c & d) | (~c & a)) + k[7] + 0xfd469501;
    b = rotateLeft(b, 22);
    b += c;

    a += ((b & c) | (~b & d)) + k[8] + 0x698098d8;
    a = rotateLeft(a, 7);
    a += b;
    d += ((a & b) | (~a & c)) + k[9] + 0x8b44f7af;
    d = rotateLeft(d, 12);
    d += a;
    c += ((d & a) | (~d & b)) + k[10] + 0xffff5bb1;
    c = rotateLeft(c, 17);
    c += d;
    b += ((c & d) | (~c & a)) + k[11] + 0x895cd7be;
    b = rotateLeft(b, 22);
    b += c;

    a += ((b & c) | (~b & d)) + k[12] + 0x6b901122;
    a = rotateLeft(a, 7);
    a += b;
    d += ((a & b) | (~a & c)) + k[13] + 0xfd987193;
    d = rotateLeft(d, 12);
    d += a;
    c += ((d & a) | (~d & b)) + k[14] + 0xa679438e;
    c = rotateLeft(c, 17);
    c += d;
    b += ((c & d) | (~c & a)) + k[15] + 0x49b40821;
    b = rotateLeft(b, 22);
    b += c;

    a += ((b & d) | (c & ~d)) + k[1] + 0xf61e2562;
    a = rotateLeft(a, 5);
    a += b;
    d += ((a & c) | (b & ~c)) + k[6] + 0xc040b340;
    d = rotateLeft(d, 9);
    d += a;
    c += ((d & b) | (a & ~b)) + k[11] + 0x265e5a51;
    c = rotateLeft(c, 14);
    c += d;
    b += ((c & a) | (d & ~a)) + k[0] + 0xe9b6c7aa;
    b = rotateLeft(b, 20);
    b += c;

    a += ((b & d) | (c & ~d)) + k[5] + 0xd62f105d;
    a = rotateLeft(a, 5);
    a += b;
    d += ((a & c) | (b & ~c)) + k[10] + 0x02441453;
    d = rotateLeft(d, 9);
    d += a;
    c += ((d & b) | (a & ~b)) + k[15] + 0xd8a1e681;
    c = rotateLeft(c, 14);
    c += d;
    b += ((c & a) | (d & ~a)) + k[4] + 0xe7d3fbc8;
    b = rotateLeft(b, 20);
    b += c;

    a += ((b & d) | (c & ~d)) + k[9] + 0x21e1cde6;
    a = rotateLeft(a, 5);
    a += b;
    d += ((a & c) | (b & ~c)) + k[14] + 0xc33707d6;
    d = rotateLeft(d, 9);
    d += a;
    c += ((d & b) | (a & ~b)) + k[3] + 0xf4d50d87;
    c = rotateLeft(c, 14);
    c += d;
    b += ((c & a) | (d & ~a)) + k[8] + 0x455a14ed;
    b = rotateLeft(b, 20);
    b += c;

    a += ((b & d) | (c & ~d)) + k[13] + 0xa9e3e905;
    a = rotateLeft(a, 5);
    a += b;
    d += ((a & c) | (b & ~c)) + k[2] + 0xfcefa3f8;
    d = rotateLeft(d, 9);
    d += a;
    c += ((d & b) | (a & ~b)) + k[7] + 0x676f02d9;
    c = rotateLeft(c, 14);
    c += d;
    b += ((c & a) | (d & ~a)) + k[12] + 0x8d2a4c8a;
    b = rotateLeft(b, 20);
    b += c;

    a += (b ^ c ^ d) + k[5] + 0xfffa3942;
    a = rotateLeft(a, 4);
    a += b;
    d += (a ^ b ^ c) + k[8] + 0x8771f681;
    d = rotateLeft(d, 11);
    d += a;
    c += (d ^ a ^ b) + k[11] + 0x6d9d6122;
    c = rotateLeft(c, 16);
    c += d;
    b += (c ^ d ^ a) + k[14] + 0xfde5380c;
    b = rotateLeft(b, 23);
    b += c;

    a += (b ^ c ^ d) + k[1] + 0xa4beea44;
    a = rotateLeft(a, 4);
    a += b;
    d += (a ^ b ^ c) + k[4] + 0x4bdecfa9;
    d = rotateLeft(d, 11);
    d += a;
    c += (d ^ a ^ b) + k[7] + 0xf6bb4b60;
    c = rotateLeft(c, 16);
    c += d;
    b += (c ^ d ^ a) + k[10] + 0xbebfbc70;
    b = rotateLeft(b, 23);
    b += c;

    a += (b ^ c ^ d) + k[13] + 0x289b7ec6;
    a = rotateLeft(a, 4);
    a += b;
    d += (a ^ b ^ c) + k[0] + 0xeaa127fa;
    d = rotateLeft(d, 11);
    d += a;
    c += (d ^ a ^ b) + k[3] + 0xd4ef3085;
    c = rotateLeft(c, 16);
    c += d;
    b += (c ^ d ^ a) + k[6] + 0x04881d05;
    b = rotateLeft(b, 23);
    b += c;

    a += (b ^ c ^ d) + k[9] + 0xd9d4d039;
    a = rotateLeft(a, 4);
    a += b;
    d += (a ^ b ^ c) + k[12] + 0xe6db99e5;
    d = rotateLeft(d, 11);
    d += a;
    c += (d ^ a ^ b) + k[15] + 0x1fa27cf8;
    c = rotateLeft(c, 16);
    c += d;
    b += (c ^ d ^ a) + k[2] + 0xc4ac5665;
    b = rotateLeft(b, 23);
    b += c;
  }
}

const encrypt = (plaintext) => {
  var md5Text = md5(plaintext);
    return md5Text;
  }

  module.exports = { encrypt };
