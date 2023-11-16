import should from 'should';
import DependanceCirculaire from '../src/dependance';

describe('Une dependance circulaire', () => {

  it('s\'instancie avec un String', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("");
    should.exists(dp);
  });

  it('et crée une liste de chaque fichier ts', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c");
    should(dp.tsFiles).have.length(3);
    should(dp.getTSFile('a').name).equals('a');
  })

  it('a chaque fichier ts est associé sa dépendance', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c");
    let a = dp.getTSFile('a');
    let b = dp.getTSFile('b');
    let c = dp.getTSFile('c');
    a.dependsOn.name.should.equal('b');
    b.dependsOn.name.should.equal('c');
    c.dependsOn.name.should.equal('a');
  })
});

describe('deux dependances circulaire', () => {
  it('sont égales si les ont la même sequence', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
    let dp2: DependanceCirculaire = new DependanceCirculaire("c > a > b > c");
    dp.equals(dp2).should.be.true();
  })
  it('sont différentes si les n\'ont pas la même sequence', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
    let dp2: DependanceCirculaire = new DependanceCirculaire("c > a > d > c");
    dp.equals(dp2).should.be.false();
  })
  it('sont différentes si les n\'ont pas la même sequence', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
    let dp2: DependanceCirculaire = new DependanceCirculaire("a > c > b > a");
    dp.equals(dp2).should.be.false();
  })
  it('sont différentes si les n\'ont pas la même sequence', () => {
    let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
    let dp2: DependanceCirculaire = new DependanceCirculaire("a > b > c > d > a");
    dp.equals(dp2).should.be.false();
  })
})

describe('une dependances circulaire', () => {
  describe('est une sous sequence dans les cas suivants', () => {

    it('a > b > c > a dans z > a > b > c > z', () => {
      let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
      let dp2: DependanceCirculaire = new DependanceCirculaire("z > a > b > c > z");
      dp.isSubSequenceOf(dp2).should.be.true();
    })
    it('a > b > c > a dans z > c > a > b > z', () => {
      let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
      let dp2: DependanceCirculaire = new DependanceCirculaire("z > c > a > b > z");
      dp.isSubSequenceOf(dp2).should.be.true();
    })
    it('a > b > c > a dans b > c > d > a > b', () => {
      let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
      let dp2: DependanceCirculaire = new DependanceCirculaire("b > c > d > a > b");
      dp.isSubSequenceOf(dp2).should.be.true();
    })
  })

  describe('n\'est pas une sous sequence dans les cas suivants', () => {

    it('a > b > c > a dans z > a > b > d > z', () => {
      let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
      let dp2: DependanceCirculaire = new DependanceCirculaire("z > a > b > d > z");
      dp.isSubSequenceOf(dp2).should.be.false();
    })

    it('a > b > c > a dans z > a > c > b > z', () => {
      let dp: DependanceCirculaire = new DependanceCirculaire("a > b > c > a");
      let dp2: DependanceCirculaire = new DependanceCirculaire("z > a > c > b > z");
      dp.isSubSequenceOf(dp2).should.be.false();
    })
  })
})
