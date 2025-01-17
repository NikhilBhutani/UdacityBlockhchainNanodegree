// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require('Verifier');

const { proof, inputs } = require('./proof.json')

contract('Verifier', accounts => {

describe('Test verification', function () {
    beforeEach(async function () {
        this.contract = await Verifier.new({ from: accounts[0] });
    });

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('should verify correct proof', async function () {
        let verification = await this.contract.verifyTx.call(proof.a, proof.b, proof.c, inputs);
        assert.isTrue(verification, "Doesn't verify correct proof");
    });

    // Test verification with incorrect proof
    it('should not verify incorrect proof', async function () {
        let verification = await this.contract.verifyTx.call(proof.a, proof.b, proof.c, [0,9]);
        assert.isFalse(verification, "Verifies incorrect proof");
    });

});

})
