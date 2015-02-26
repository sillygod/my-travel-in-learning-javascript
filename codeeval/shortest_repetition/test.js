QUnit.test("hello test", function(assert) {


    assert.equal(solve('abcabcabcabc'), '3', "Passed!");
    assert.equal(solve('bcbcbcbcbcbcbcbcbcbcbcbcbcbc'), '2', "Passed!");
    assert.equal(solve('dddddddddddddddddddd'), '1', 'Passed!');
    assert.equal(solve('adcdefg'), '7', 'Passed!');
});
