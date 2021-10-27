export class Person {
  constructor(public name: string, public age: number) {}

  public greeting(this: Person): void {
    const hoge = 123;
    document.write(
      `私の名前は${this.name}です。年齢は${this.age}歳です。${hoge}`
    );
  }
}
