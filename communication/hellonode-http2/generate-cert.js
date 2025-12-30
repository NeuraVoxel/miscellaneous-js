const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

// 生成自签名证书
function generateCertificate() {
  // 生成一个新的密钥对
  const keys = forge.pki.rsa.generateKeyPair(2048);
  
  // 创建证书
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  // 证书属性
  const attrs = [{
    name: 'commonName',
    value: 'localhost'
  }, {
    name: 'countryName',
    value: 'US'
  }, {
    name: 'organizationName',
    value: 'Test HTTP/2'
  }];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // 设置扩展
  cert.setExtensions([{
    name: 'basicConstraints',
    cA: true
  }, {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true
  }, {
    name: 'subjectAltName',
    altNames: [{
      type: 2, // DNS
      value: 'localhost'
    }]
  }]);

  // 使用私钥对证书进行签名
  cert.sign(keys.privateKey, forge.md.sha256.create());

  // 将私钥转换为PEM格式
  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  // 将证书转换为PEM格式
  const certificatePem = forge.pki.certificateToPem(cert);

  // 确保证书目录存在
  const certDir = path.join(__dirname, 'certs');
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir);
  }

  // 保存私钥和证书
  fs.writeFileSync(path.join(certDir, 'private-key.pem'), privateKeyPem);
  fs.writeFileSync(path.join(certDir, 'certificate.pem'), certificatePem);

  console.log('证书生成成功！保存在 certs 目录中。');
}

generateCertificate();