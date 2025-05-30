import StartNode from './StartNode'
import EndNode from './EndNode'
import TextNode from './TextNode'
import QuestionNode from './QuestionNode'
import ChoiceNode from './ChoiceNode'
import ConditionNode from './ConditionNode'
import PaymentNode from './PaymentNode'

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  text: TextNode,
  question: QuestionNode,
  choice: ChoiceNode,
  condition: ConditionNode,
  payment: PaymentNode,
} 