class TreeNode {
  name: string;
  children: TreeNode[] | undefined;

  constructor(data: string) {
    this.name = data;
    this.children = [];
  }
}

class ExpressionTree {
  stack: Array<TreeNode>;
  operators: Array<string>;

  constructor() {
    this.stack = [];
    this.operators = ['+', '-', '*', '/', '(', ')', '^', '%'];
  }

  buildExpressionTree(expression: string[]) {
    expression.forEach((char) => {
      const node = new TreeNode(char)
      if (!this.operators.includes(char)) {
        node.name = parseFloat(node.name).toString()
        this.stack.push(node)
      } else {
        const r = this.stack.pop()
        const l = this.stack.pop()
        if (r instanceof TreeNode) {
          node.children?.push(r)
        }
        if (l instanceof TreeNode) {
          node.children?.push(l)
        }
        this.stack.push(node)
      }
    })
  }
}

export function createTreeFromPostfix(postfixArray: Array<string>): TreeNode[] {
  let tree = new ExpressionTree();
  tree.buildExpressionTree(postfixArray);
  console.log('tree', tree.stack);
  return tree.stack
}
