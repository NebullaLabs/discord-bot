// Teste da função somar
function somar(a, b) {
    return a + b;
}
  
test('somar adiciona dois números corretamente', () => {
    expect(somar(1, 2)).toBe(3);
    expect(somar(-1, 3)).toBe(2);
    expect(somar(0, 0)).toBe(0);
});