type InputElementType = 'operation' | 'digit' | 'empty'

export class InputElement {
  public value: string;
  public type: InputElementType;
  public error: Error | null;
  public bracket: boolean;

  constructor(value: string, type: InputElementType) {
    this.value = value === '.' ? `0${value}` : value;
    this.type = type;
    this.error = null;
    this.bracket = this.type === 'operation' && ['(', ')'].includes(this.value)
  }

  addToValueStr(str: string) {
    this.value = (this.value + str).replace('..','.');
  }

  deleteFromValueStr() {
    this.value = this.value.slice(0, -1);
  }
}

export function makeStringFromInputElementsArray(inputElements: InputElement[]): string {
  return inputElements.map(element => element.value).join(' ')
}
