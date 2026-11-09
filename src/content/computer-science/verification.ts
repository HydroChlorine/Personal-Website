import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'
import { csSources as s } from './sources.ts'

export const verificationArticle: ProjectArticle = {
  kind: 'topic',
  subject: 'computer-science',
  kicker: 'Make the claim precise, then build something a machine can check',
  reviewed: '2026-11-09',
  introduction: [
    'Suppose insertion returns a tree that looks reasonable. Did it preserve the ordering? Will a lookup find the value just inserted? What happened to every other entry? A few successful runs are useful, but the questions themselves are about more than a few runs.',
    'Formal verification gives those questions a precise language. A property becomes a proposition with explicit premises, and proving it means constructing evidence that the checker can verify. In Rocq, that evidence is a proof term, closely connected to a typed functional program.',
    'I worked through red-black-tree proofs in Cornell CS 4160 using Software Foundations. This article follows that work: the tree implementation and chapter provide the setting; my contribution is the completed exercise proofs. The small trees and animations below were constructed for the explanation.',
  ],
  sections: [
    {
      id: 'claim',
      title: '01 / What are we actually claiming?',
      paragraphs: [
        'Testing asks an implementation questions about particular inputs. A specification states the relationship we want for a whole class of inputs. For insertion, that class might be every tree satisfying a binary-search-tree invariant.',
        'The premise matters. If a lookup relies on keys being ordered, its correctness statement must say so. The aim is to turn an informal hope into an exact relationship among the input, the operation, and the output. Tests remain valuable for integration, examples, and regressions; the proof gives us a different kind of evidence.',
      ],
      figure: fig(
        'tests-property',
        'Specific insertion tests are contrasted with a statement quantified over every valid input tree.',
        'A few examples and a quantified claim serve different purposes. A proof still needs the definitions and premises of that claim.',
      ),
    },
    {
      id: 'terms',
      title: '02 / A proof can be an object',
      paragraphs: [
        'Under the propositions-as-types viewpoint, evidence for a proposition has a type. A proof of an implication can behave like a function: give it evidence for the premise, and it constructs evidence for the conclusion.',
        'For example, assume we have evidence for A, a function from A to B, and a function from B to C. Applying the first function gives evidence for B; applying the second gives evidence for C. The composition is itself a function from A to C. This is a small constructive example of proofs composing like programs.',
        'Rocq tactics help construct proof terms. The kernel checks that those terms have the types claimed for them. This makes the reasoning checkable within the formal system and its assumptions. It does not mean that any arbitrary program automatically proves the statement we had in mind.',
      ],
      figure: fig(
        'proof-objects',
        'Evidence and typed functions compose from A through B to C, yielding a term and a composed A-to-C function.',
        'The functions are assumptions in this example. The diagram illustrates typed application, not a live proof-assistant session.',
        1300,
      ),
      sources: [s.rocq],
    },
    {
      id: 'shape',
      title: '03 / Change the tree, preserve its meaning',
      paragraphs: [
        'A search tree keeps smaller keys to the left and larger keys to the right. Rotations and rebalancing change its shape, so the first useful question is what they must leave alone.',
        'In-order traversal makes that visible. A local reorganization can move the middle key to the top while leaving the ordered sequence of keys unchanged. The proof has to express the corresponding facts about the subtrees and their key ranges, rather than rely on how convincing a single picture looks.',
        'The animation uses a temporary red-red chain of three keys. A local balance produces a red root with black children; blackening the final root is another step. The stages are deliberately separate so that an intermediate condition is not confused with the final tree invariant.',
      ],
      figure: fig(
        'rebalance',
        'A temporary red-red chain containing keys 30, 20, and 10 is balanced around 20, then its root is blackened.',
        'The ordered keys remain 10, 20, 30. This is an original small instance of the chapter’s balancing idea.',
      ),
      sources: [s.redblack, s.okasaki],
    },
    {
      id: 'colors',
      title: '04 / Colors are constraints, not decoration',
      paragraphs: [
        'The red-black invariant controls how far the tree can lean. Adjacent red nodes are forbidden, and each path to an empty leaf has the same black count. Together those constraints limit the difference between long and short paths.',
        'It is useful to see the constraints separately from key ordering. A tree can have correctly ordered keys and still fail its color conditions. In the development, predicates describe these properties explicitly; the insertion proofs show that the relevant conditions survive the operation.',
      ],
      figure: fig(
        'invariant-paths',
        'Paths through a seven-node tree are highlighted one at a time, each containing two black nonempty nodes and no adjacent red nodes.',
        'Empty leaves are implicit and contribute zero to the black-height convention used here.',
      ),
      sources: [s.redblack],
    },
    {
      id: 'lookup',
      title: '05 / The useful guarantee is about what a lookup returns',
      paragraphs: [
        'A dictionary is not just a nice tree shape. Insert a key with a value, and looking up that key should return the inserted value. Looking up a different key should return what it returned before, under the stated ordering premises.',
        'That connects the structural proofs to observable behavior. A balance lemma helps explain what lookup does after a local transformation. Recursive insertion lemmas then support the public insertion properties. The arrows in the next figure are selected proof chains, not the entire dependency graph.',
      ],
      figure: fig(
        'lookup-meaning',
        'Replacing the value at key 20 changes old to new while values at keys 10 and 30 remain unchanged.',
        'One dictionary example of the inserted-key and other-key properties.',
      ),
      figures: [
        fig(
          'proof-dependencies',
          'Selected chains connect local balance facts, recursive insertion proofs, and public ordering, lookup, and red-black guarantees.',
          'Case automation is a tactic strategy; its resulting proof terms are checked. The diagram shows selected dependencies.',
          1300,
        ),
      ],
      equations: [
        {
          label: 'One of the useful interfaces, with its precondition visible',
          expression:
            'BST(t) ⇒ lookup(d, k, insert(k, v, t)) = v\nBST(t) ∧ k ≠ k′ ⇒\n  lookup(d, k′, insert(k, v, t)) = lookup(d, k′, t)',
        },
      ],
      detailParagraphs: [
        'The working file includes balanceP, insP, ins_BST, insert_BST, balance_lookup, lookup_insert_eq, lookup_insert_neq, and red-black-invariant lemmas. My completed exercises fit into the chapter’s provided definitions and proof structure. They do not amount to a new red-black algorithm or a claim to have verified every operation of an industrial library.',
      ],
      sources: [s.redblack, s.license],
    },
    {
      id: 'height',
      title: '06 / A shape constraint becomes a bound',
      paragraphs: [
        'The file also proves that the maximum depth is at most twice the minimum depth plus one. The precise extra term follows the invariant’s color convention, which permits the root color to depend on the hypothetical parent color.',
        'The example below has a long path of four nonempty nodes and a short path of two. It satisfies the bound: four is at most five. The picture explains one case; induction over the invariant supplies the general result.',
        'The proof excerpt is compact because the definitions and induction hypotheses already contain useful structure. Automation can assemble the arithmetic steps, but choosing the right invariant and auxiliary lemmas is a substantial part of making that possible.',
      ],
      figure: fig(
        'height-bound',
        'A valid red-black tree highlights long and short paths, alongside bars for height four, minimum depth two, and bound five.',
        'A constructed tree satisfying the invariant. The height bound is a structural result, distinct from a complete machine-runtime cost proof.',
      ),
      equations: [
        {
          label: 'The bound proved in my working file',
          expression: 'RB(t, c, n) ⇒ height(t) ≤ 2 · mindepth(t) + 1',
        },
      ],
      code: {
        label:
          'Completed exercise proof in the Software Foundations setting; MIT notices linked below',
        text: 'Lemma redblack_height : forall (V : Type) (t : tree V) (c : color) (n : nat),\n    RB t c n ->\n    (height t <= 2 * n + (match c with Red => 0 | Black => 1 end))%nat.\nProof.\n  induction 1; simpl; lia.\nQed.',
      },
      detailParagraphs: [
        'This excerpt depends on the chapter’s preceding definitions and imports; it is not a standalone program. The final redblack_balanced theorem combines the upper-height and lower-minimum-depth lemmas. Software Foundations supplies the chapter framework; I completed the exercise proofs. The retained MIT notices identify the material’s source and reuse terms.',
      ],
      sources: [s.redblack, s.license],
    },
    {
      id: 'boundary',
      title: '07 / Know what the checker checked',
      paragraphs: [
        'For this article, a temporary copy of my supplied file was compiled successfully with Rocq 9.1.0. The course directory was left untouched. I also inspected the assumptions reported for the ordering, lookup, insertion-color, and balance results.',
        'The ordering and lookup results depend on the chapter’s abstract integer/comparison model. The reported assumptions for redblack_balanced include the abstract key type. These are explicit parts of the formal setting; a checked result is a guarantee relative to that setting.',
        'This is what makes the method useful to me: I can ask exactly which property was proved, for which inputs, and from which assumptions. A formal specification still has to express the intended problem. Once it does, the resulting evidence is something a small checker can examine rather than a sequence of informal leaps.',
      ],
      aside: {
        title: 'What this example establishes',
        text: 'Completed course proofs about this functional red-black-tree implementation, with an isolated compilation and selected assumption checks. It is a concrete use of formal verification, not a claim that all software or every true statement is covered.',
      },
      detailParagraphs: [
        'The source contains no active admit/Admitted commands after comments are excluded. Earlier Abort blocks are explanatory attempts followed by completed versions. The four inspected results were insert_BST, lookup_insert_eq, insert_RB, and redblack_balanced. Importing FunctionalExtensionality does not mean each theorem depends on it; it was not listed in these reported assumption sets. The chapter’s benchmark comments are not my measurements and are not presented as portfolio results.',
      ],
      sources: [s.rocq, s.extract, s.redblack, s.license],
    },
  ],
}
