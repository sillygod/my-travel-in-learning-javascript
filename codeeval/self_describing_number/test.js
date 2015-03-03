QUnit.test('self describing number test', function(assert){
    assert.equal(solve('2020'), '1', 'ok');
    assert.equal(solve('22'), '0', 'ok');
    assert.equal(solve('1210'), '1', 'ok');
});