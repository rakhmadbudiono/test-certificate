const { assert } = require("chai");

const TestCertificate = artifacts.require("TestCertificate");

require("chai").use(require("chai-as-promised")).should();

contract("TestCertificate", ([account1, account2, account3]) => {
  let contract;

  const certificate = {
    additional_info: "-",
    certificate_expiry_timestamp: 1622967475696,
    digital_signature:
      '{"message":"{\\"encrypted_patient_id\\":\\"eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0\\",\\"test_taken_timestamp\\":1622362675696,\\"certificate_expiry_timestamp\\":1622967475696,\\"test_type\\":\\"Rapid Antibodi\\",\\"test_result\\":\\"Positive\\",\\"encrypted_external_data_pointer\\":\\"eyJhbGciOiJIUzI1NiJ9.aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZcmFaYkxDNFJ0aGVlZHBKQnk2U2pMalM5UVZhMVhuMUVlYWFoNnl4R0V2OQ.oxG7ycBZFSJfTeI6vYrO0hvFAguNh26-1sUYVha1_eU\\",\\"patient_home_address\\":\\"Jl. Cisitu Indah Gg. Masjid No. 21\\",\\"patient_gender\\":\\"Laki-laki\\",\\"patient_age\\":\\"22\\",\\"additional_info\\":\\"-\\"}","messageHash":"0xc53341c31c57e4025a3d7679e0e930e6fa2878a3f5aa7bfc605c2dd9a7f42b26","v":"0x1c","r":"0xe4ee14974564ebf9b748c97b3d324391aab9f5a820ff57c80d7da3edcf33dae1","s":"0x33755c87d3b32d546c4ef213244f8d1a9453f0cd6ab9e7a34a6ad6347ca26af0","signature":"0xe4ee14974564ebf9b748c97b3d324391aab9f5a820ff57c80d7da3edcf33dae133755c87d3b32d546c4ef213244f8d1a9453f0cd6ab9e7a34a6ad6347ca26af01c"}',
    encrypted_external_data_pointer:
      "eyJhbGciOiJIUzI1NiJ9.aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZcmFaYkxDNFJ0aGVlZHBKQnk2U2pMalM5UVZhMVhuMUVlYWFoNnl4R0V2OQ.oxG7ycBZFSJfTeI6vYrO0hvFAguNh26-1sUYVha1_eU",
    encrypted_patient_id:
      "eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0",
    patient_age: "22",
    patient_gender: "Laki-laki",
    patient_home_address: "Jl. Cisitu Indah Gg. Masjid No. 21",
    test_result: "Positive",
    test_taken_timestamp: 1622362675696,
    test_type: "Rapid Antibodi",
    address: "0xF6f9102D17e01Ca37131f05366040ddB7a9EC3f8",
  };

  before(async () => {
    contract = await TestCertificate.new([account1]);

    await contract.register("Tester 2", "Jl. Ganesha No. 11", "081234567891", {
      from: account3,
    });
  });

  describe("Tester Registration", async () => {
    it("non-tester account register as a tester", async () => {
      await contract.register(
        "Tester 1",
        "Jl. Ganesha No. 10",
        "081234567890",
        { from: account1 }
      );

      const isTester = await contract.isTester(account1);
      assert.equal(isTester, true);
    });

    it("tester account register as a tester", async () => {
      await contract.register(
        "Tester 1",
        "Jl. Ganesha No. 10",
        "081234567890",
        { from: account1 }
      ).should.be.rejected;
    });

    it("authority approve a tester", async () => {
      await contract.approveTester(account1, { from: account1 });

      const isTesterApproved = await contract.isTesterApproved(account1);
      assert.equal(isTesterApproved, true);
    });

    it("authority revoke a tester", async () => {
      await contract.revokeTester(account1, { from: account1 });

      const isTesterApproved = await contract.isTesterApproved(account1);
      assert.equal(isTesterApproved, false);
    });

    it("non-authority approve a tester", async () => {
      await contract.approveTester(account1, { from: account2 }).should.be
        .rejected;
    });

    it("non-authority revoke a tester", async () => {
      await contract.revokeTester(account1, { from: account2 }).should.be
        .rejected;
    });

    it("authority add another account to be authority", async () => {
      await contract.addAuthority(account3, { from: account1 });

      const isAuthority = await contract.isAuthority(account1);
      assert.equal(isAuthority, true);
    });

    it("non-authority add another account to be authority", async () => {
      await contract.addAuthority(account3, { from: account2 }).should.be
        .rejected;
    });
  });

  describe("Certificate Creation", async () => {
    it("tester account create a certificate", async () => {
      const trx = await contract.createTestCertificate(
        certificate.encrypted_patient_id,
        certificate.test_taken_timestamp,
        certificate.certificate_expiry_timestamp,
        certificate.test_type,
        certificate.test_result,
        certificate.encrypted_external_data_pointer,
        certificate.patient_home_address,
        certificate.patient_gender,
        certificate.patient_age,
        certificate.digital_signature,
        certificate.additional_info,
        { from: account1 }
      );

      assert.isNotNull(trx.logs[0].args);
      assert.isNotNull(trx.logs[1].args);
    });

    it("non-tester account create a certificate", async () => {
      await contract.createTestCertificate(
        certificate.encrypted_patient_id,
        certificate.test_taken_timestamp,
        certificate.certificate_expiry_timestamp,
        certificate.test_type,
        certificate.test_result,
        certificate.encrypted_external_data_pointer,
        certificate.patient_home_address,
        certificate.patient_gender,
        certificate.patient_age,
        certificate.digital_signature,
        certificate.additional_info,
        { from: account2 }
      ).should.be.rejected;
    });
  });

  describe("Certificate Access", async () => {
    it("access tester's certificate amount", async () => {
      const amount = await contract.getCertificateAmountByTester({
        from: account1,
      });

      assert.equal(amount, 1);
    });

    it("access tester's first certificate id", async () => {
      const id = await contract.getCertificateId(0, {
        from: account1,
      });

      assert.equal(id, 0);
    });

    it("access tester's first certificate detail", async () => {
      const cert = await contract.getCertificate(0);

      assert.equal(cert[0], certificate.encrypted_patient_id);
      assert.equal(cert[1], certificate.test_taken_timestamp);
      assert.equal(cert[2], certificate.certificate_expiry_timestamp);
      assert.equal(cert[3], certificate.test_type);
      assert.equal(cert[4], certificate.test_result);
      assert.equal(cert[5], false);
      assert.equal(cert[6], certificate.encrypted_external_data_pointer);
      assert.equal(cert[7], certificate.additional_info);

      const patient = await contract.getPatientDetail(0);

      assert.equal(patient[0], certificate.patient_home_address);
      assert.equal(patient[1], certificate.patient_gender);
      assert.equal(patient[2], certificate.patient_age);

      const signature = await contract.getCertificateDigitalSignature(0);

      assert.equal(signature[0], account1);
      assert.equal(signature[1], certificate.digital_signature);
    });
  });

  describe("Revoke Certificate", async () => {
    it("non-tester revoke a certificate", async () => {
      await contract.revokeTestCertificate(0, {
        from: account2,
      }).should.be.rejected;
    });

    it("tester revoke another tester's certificate", async () => {
      await contract.revokeTestCertificate(0, {
        from: account3,
      }).should.be.rejected;
    });

    it("tester revoke their certificate", async () => {
      const trx = await contract.revokeTestCertificate(0, {
        from: account1,
      });

      assert.isNotNull(trx.logs[0].args);
    });
  });
});
