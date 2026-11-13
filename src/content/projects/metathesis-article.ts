import type { ArticleFigure, ProjectArticle } from '../types'

function figure(
  name: string,
  height: number,
  mobileHeight: number,
  alt: string,
  caption: string,
): ArticleFigure {
  const path = `/media/metathesis/${name}`
  return {
    src: `${path}.svg`,
    mobileSrc: `${path}-mobile.svg`,
    width: 900,
    height,
    mobileHeight,
    alt,
    caption,
    pixel: {
      gif: `${path}-pixel.gif`,
      still: `${path}-pixel.png`,
      mobileGif: `${path}-pixel-mobile.gif`,
      mobileStill: `${path}-pixel-mobile.png`,
    },
    crisp: { gif: `${path}-crisp.gif`, mobileGif: `${path}-crisp-mobile.gif` },
  }
}
const background = {
  chauvin: {
    label: 'The metal-alkylidene metathesis platform',
    href: 'https://doi.org/10.1038/nature06351',
  },
  hydrazine: {
    label: 'The original hydrazine carbonyl–olefin metathesis report',
    href: 'https://doi.org/10.1021/ja309650u',
  },
  mechanism: {
    label:
      'Computational work on related hydrazine cycloaddition / cycloreversion steps',
    href: 'https://doi.org/10.1039/c3sc52882k',
  },
  chromenes: {
    label: 'Earlier hydrazine ring-closing carbonyl–olefin metathesis',
    href: 'https://doi.org/10.1021/acscatal.9b03656',
  },
  romp: {
    label: 'Hydrazonium-initiated olefin metathesis polymerization',
    href: 'https://doi.org/10.1002/anie.202203344',
  },
  helicene: {
    label: 'A ruthenium-catalyzed route to helicenes for comparison',
    href: 'https://doi.org/10.1002/anie.200504150',
  },
}
export const metathesisArticle: ProjectArticle = {
  subject: 'chemistry',
  kicker: 'Metal-free ring-closing olefin metathesis / Lambert Group',
  reviewed: '2026-11-13',
  detailsLabel: 'A closer look / chemistry & references',
  introduction: [
    'Take a molecule with two alkene groups, bring them into the right conversation, and turn an open chain into a ring. Ring-closing metathesis is one of those transformations that makes a complicated synthesis suddenly look much shorter. The usual conversation is organized by a transition-metal complex. Our question was whether a small organic hydrazine could organize a different one.',
    'In the Lambert Group at Cornell, we developed a metal-free route to ring-closing olefin metathesis. A bicyclic hydrazine and an aromatic aldehyde initiate a proposed sequence of five-membered intermediates that carries a diene toward ring closure. The work reaches nitrogen- and oxygen-containing rings, more elaborate targets, and fused aromatic frameworks; a designed substrate also lets the hydrazine turn over catalytically.',
    'Our manuscript, “Metal-Free Ring Closing Olefin Metathesis,” is by Chengyi Fan, Lichen Huang and Tristan Lambert and is being prepared for journal submission.',
  ],
  sections: [
    {
      id: 'why-close-a-ring',
      title: '01 / Closing the chain changes the problem',
      paragraphs: [
        'Rings are everywhere in useful molecules, but making the last connection can be a very different problem from extending a chain. In ring-closing metathesis, two alkenes already attached to the same framework exchange their bonding partners. A new alkene closes the ring, while the remaining carbon fragments leave the target framework through other molecules.',
        'The attraction is the planning shortcut: build a suitable diene, then let the ring-closing step assemble the cyclic skeleton. The connecting chain determines which atoms stay in the ring. The alkene substitution and activation pathway determine whether that apparently simple plan actually works.',
        'Our metal-free reaction preserves that synthetic idea but changes how the exchange is carried out. The first animation follows the conventional metal cycle: a metal alkylidene adds to an alkene, forms a metallacyclobutane, then breaks it in the other direction. Repeating the exchange within the tether closes the ring. For a terminal diene, ethylene is released and the metal methylidene is regenerated. Our hydrazonium route, introduced next, uses a different relay and different coproducts.',
      ],
      figure: figure(
        'net-exchange',
        620,
        760,
        'Shaded ball-and-stick models show a metal methylidene approaching a terminal diene, forming two successive metallacyclobutanes, releasing ethylene and closing a six-membered cyclic alkene while regenerating the metal methylidene.',
        'The conventional metal-alkylidene cycle: two exchanges close the ring and regenerate the carrier. M marks the metal site; ancillary ligands and C–H bonds are omitted.',
      ),
      sources: [background.chauvin],
    },
    {
      id: 'another-platform',
      title: '02 / A different way to organize the exchange',
      paragraphs: [
        'Established olefin metathesis uses metal alkylidenes, often based on ruthenium or molybdenum. In the Chauvin picture, a metal alkylidene and an alkene form a four-membered metallacyclobutane. Breaking that intermediate in the other direction exchanges the alkene partners. Repeating those operations makes a remarkably versatile reaction family.',
        'The hydrazine platform works through a different kind of intermediate. An aldehyde and the bicyclic hydrazine form a hydrazonium species. A proposed [3+2] cycloaddition with an alkene gives a five-membered pyrazolidinium ion; a cycloreversion can then redistribute the bonding partners. Earlier work in our group established this strategy for carbonyl–olefin exchange and extended it into olefin–olefin polymerization.',
        'Our next step was to bring that platform to olefin–olefin ring closure. Could a hydrazonium connect the two alkenes of an acyclic diene and deliver the same powerful synthetic shortcut? That question led to this project.',
      ],
      figure: figure(
        'two-platforms',
        620,
        1150,
        'Rotating ball-and-stick models show an alkene approaching a metal alkylidene on the left and a bicyclic hydrazonium on the right. New bonds produce four-membered metallacyclobutane and five-membered pyrazolidinium intermediates.',
        'Two cycloaddition platforms in motion. The oversized amber sphere marks the metal site; blue spheres are nitrogen in the bicyclic hydrazonium. The organic model includes the full [2.2.2] cage. Ancillary metal ligands, C–H bonds and the BF₄⁻ counterion are omitted.',
      ),
      detailParagraphs: [
        'The ring-closing step uses the di-HBF₄ salt of 2,3-diazabicyclo[2.2.2]octane and pentafluorobenzaldehyde, without adding a metal reagent.',
        'This gives ring closure a second activation language. Avoiding a deliberately added metal reagent is useful in its own right when metal removal matters, and the additive tests below show a complementary functional-group compatibility profile.',
      ],
      sources: [background.hydrazine, background.chromenes, background.romp],
    },
    {
      id: 'the-relay',
      title: '03 / Catch one alkene, then reach for the other',
      paragraphs: [
        'Think of the hydrazonium as a carrier that can change which carbon fragment it is attached to. First, the bicyclic hydrazine condenses with pentafluorobenzaldehyde to make the initiating aryl hydrazonium. Its proposed encounter with one substrate alkene forms a pyrazolidinium intermediate.',
        'The first cycloreversion releases a styrene derived from the initiating aldehyde and leaves a hydrazonium attached to the substrate. That handoff is what makes the second alkene special: it is now tethered nearby, so an intramolecular cycloaddition can bring the framework together. A second cycloreversion furnishes the cyclic alkene and a coproduct-derived hydrazonium.',
        'We isolated and characterized cycloadducts and a hydrazonium coproduct, giving experimental support for key steps in this proposed relay. Together with earlier mechanistic studies, those structures show how the organic carrier can capture, exchange and reconnect the alkene fragments.',
      ],
      figure: figure(
        'hydrazonium-relay',
        720,
        850,
        'Six successive structural drawings show the complete bicyclic cage, pentafluorophenyl initiator, an O-linked aryl diene, both pyrazolidinium intermediates, styrene release, chromene formation and coproduct hydrazonium regeneration. Bond orders and nitrogen charges change with each stage.',
        'The proposed relay in manuscript Figure 2, illustrated with a methyl-substituted chromene precursor. Follow the initiating and substrate-derived carbon fragments through both exchanges. Counterions and C–H bonds are omitted.',
      ),
      aside: {
        title: 'Closing the carrier loop',
        text: 'The carrier left after ring closure gives us a new design opportunity: choose the departing fragment so that the hydrazine can return to a productive form and start again.',
      },
      sources: [background.mechanism],
    },
    {
      id: 'reaction-development',
      title: '04 / The end of the alkene matters',
      paragraphs: [
        'A small structural choice made a substantial difference. In the N-tosyl series, changing the pendant alkene from an H/H substitution pattern to Me/H increased the NMR yield from 44% to 77%. Substrate design was already helping us turn the reaction concept into a useful method.',
        'The O-linked series gave us another productive design: an nPr/H coupling alkene. Phenyl-substituted and more highly substituted alkenes also underwent ring closure. Exploring these choices helped connect alkene structure with productive exchange.',
        'Hydrazine and aldehyde were both essential, and isopropanol gave the best result in the solvent screen. Bringing those choices together furnished the parent N-tosyl dihydroquinoline in 81% isolated yield. The practical lesson was clear: the carrier, substrate and reaction environment have to be designed together.',
      ],
      figure: figure(
        'reaction-development',
        720,
        1300,
        'Two gently rotating ball-and-stick substrate models show the H/H to Me/H change, beside fixed bars at 44 and 77 percent NMR yield. A hydrazine model introduces a second panel of fixed condition-screen results.',
        'Reaction development from manuscript Figure 3. The models highlight the alkene substitution change; fixed bars show the reported NMR yields. The optimized parent product was isolated in 81% yield.',
      ),
      detailParagraphs: [
        'The standard screen used 1.0 equivalent each of hydrazine salt and aldehyde in iPrOH at 140 °C for 20 hours. NMR yields were measured against mesitylene as an internal standard.',
        'The condition screen also gave an encouraging 48% NMR yield with 20 mol% hydrazine, pointing toward the catalytic substrate-design study below.',
      ],
    },
    {
      id: 'compatibility',
      title: '05 / What happens when another functional group is present?',
      paragraphs: [
        'A reaction rarely gets to see only the bond we want it to change. Other functional groups can bind a catalyst, interrupt an activation pathway or react with an intermediate. To probe that problem, we added representative molecules to the same ring-closing substrate and compared product formation under two protocols.',
        'Under our hydrazine conditions, phenylacetylene, a primary amine and a thiol were compatible with ring formation. Under the first-generation Grubbs protocol tested alongside them, no product was observed with those particular additives. Styrene gave similar yields under both protocols. Water, a thioether and several other additives also gave useful contrasts.',
        'That complementary compatibility is one of the most useful features of the platform. A different activation pathway opens different synthetic options, especially when the functional groups around an alkene make metal-mediated ring closure difficult.',
      ],
      figure: figure(
        'additive-compatibility',
        950,
        1560,
        'The bicyclic hydrazine and a ligand-abbreviated first-generation Grubbs model introduce paired fixed yield bars. Ball-and-stick models identify each of eight additives; nitrogen, oxygen, sulfur and halogens have distinct colors.',
        'The organic cage and first-generation Grubbs catalyst offer different compatibility profiles. Paired bars show NMR yields from manuscript Figure 4. Grubbs I is depicted as RuCl₂(=CHPh)(PCy₃)₂, with cyclohexyl groups abbreviated at phosphorus.',
      ),
      detailParagraphs: [
        'The complete A/B NMR-yield pairs are: phenylacetylene 72/0, styrene 60/59, N-methylaniline 69/23, primary amine 40/0, phenylacetic acid 99/33, thioether 88/42, thiol 65/0, and water 68/29 percent.',
        'Both tests used substrate 27b, one equivalent of additive and a 20-hour reaction time. A used hydrazine/aldehyde in iPrOH at 140 °C, assembled without deliberate water exclusion or nitrogen backfill. B used 5 mol% first-generation Grubbs catalyst in degassed CH₂Cl₂ at room temperature under N₂.',
      ],
    },
    {
      id: 'rings-we-made',
      title: '06 / From heterocycles to aromatic architectures',
      paragraphs: [
        'The scope begins with N-tosyl-1,2-dihydroquinolines and 2H-chromenes. Those names describe two related families of fused rings: one contains nitrogen, the other oxygen. Their substitution patterns matter. The N-tosyl parent was obtained in 81% isolated yield and a methyl-substituted example in 99%; the parent chromene gave 37%, while the 6-CO₂Me derivative gave 78%.',
        'Aryl chlorides, bromides and iodides survive the ring closure, leaving useful handles for later chemistry. We also reached more elaborate medicinally relevant scaffolds, including an N-acyl dihydroquinoline used in a reported antagonist synthesis and a phenyloxazole-containing chromene analogue. The ring-closing step can therefore sit within a larger synthetic plan.',
        'Aromatic annulation opened another direction, reaching fused frameworks including a [5]helicene. The scope also includes arene oligomer/polymer (70), with a wave-like sequence of annulated rings. This is the appeal of the aromatic direction: a planned series of ring closures builds a larger conjugated architecture.',
      ],
      figure: figure(
        'ring-families',
        700,
        1450,
        'Nitrogen- and oxygen-containing fused-ring cores accompany selected isolated yields. A ball-and-stick aromatic chain grows along the alternating upper and lower annulations of the wave-like framework in compound 70.',
        'Ring families from manuscript Figure 5. The scope includes arene oligomer/polymer (70); its alternating annulations give the aromatic chain its wave-like shape.',
      ),
      detailParagraphs: [
        'The [5]helicene example gives a metal-free entry to a striking three-dimensional aromatic framework. The manuscript compares it with earlier ruthenium-catalyzed helicene syntheses, linking this new activation platform to an established target family.',
        'Aryl-containing dienes connect the heterocycle and aromatic branches of the scope, providing a useful starting point for further substrate design.',
      ],
      sources: [background.helicene],
    },
    {
      id: 'designed-turnover',
      title: '07 / Design the substrate so the carrier can return',
      paragraphs: [
        'Could we design the substrate to help the hydrazine turn over? The key is the carrier produced at the end of the relay: if its departing carbon fragment leads back to a productive hydrazonium, the same hydrazine can participate in another ring closure.',
        'We designed a phenyl-substituted coupling alkene with that issue in mind. It should produce a benzaldehyde-derived hydrazonium coproduct, which could regenerate the initiating hydrazonium through hydrolysis and recondensation or carbonyl exchange with pentafluorobenzaldehyde. In the designed phenanthrene example, 20 mol% hydrazine gave 78% isolated yield.',
        'That result makes substrate design part of catalyst design. The hydrazine delivers nearly four product equivalents per equivalent loaded, with 78% isolated phenanthrene from a 20 mol% hydrazine loading. The aldehyde is still used at one equivalent. A change at the alkene has opened a route to catalytic turnover.',
      ],
      figure: figure(
        'designed-turnover',
        720,
        1250,
        'Ball-and-stick structures cycle through a phenyl-substituted divinylbiphenyl, its benzaldehyde-derived coproduct hydrazonium, and the pentafluorobenzaldehyde-derived initiating carrier. A three-ring phenanthrene model accompanies the 78 percent isolated result with 20 mol% hydrazine.',
        'Substrate-enabled hydrazine turnover, from manuscript Figure 6. A phenyl-substituted coupling alkene gives access to the proposed regeneration pathway and 78% isolated phenanthrene with 20 mol% hydrazine.',
      ),
      aside: {
        title: 'The part of the design I find especially interesting',
        text: 'A substituent is not only something the reaction must tolerate. It can decide which carrier species is produced at the end, and therefore whether the system has a plausible route back to the beginning.',
      },
    },
    {
      id: 'where-next',
      title: '08 / A new route, and a useful next question',
      paragraphs: [
        'The novelty is a new way to organize olefin–olefin ring closure: an organic hydrazonium carries an acyclic diene through five-membered intermediates, without adding a metal reagent to the ring-closing step. It reaches useful heterocycles and larger aromatic frameworks, while a deliberately designed substrate demonstrates catalytic hydrazine turnover.',
        'The compatibility experiments give this different pathway a practical advantage in several concrete settings. Phenylacetylene, a primary amine and a thiol still allowed ring formation under our conditions, whereas the first-generation Grubbs protocol tested alongside them gave no product. Avoiding metal introduction also opens possibilities where subsequent metal removal would otherwise be a concern. These are reasons to add another option to the synthetic toolbox.',
        'Where could the platform go next? I would like to connect carrier regeneration more closely with substrate design, expand the range of coupling alkenes, and see how far we can take aromatic construction. A proposed mechanism points to a molecular change; an experiment tells us whether the new design works. That conversation between structure, models and synthesis is what makes this project exciting to me.',
      ],
      figure: figure(
        'evidence-and-next',
        610,
        1500,
        'Three molecular panels emphasize the organic bicyclic platform, its thiol compatibility advantage over the tested Grubbs I protocol, and carrier designs for future catalytic turnover.',
        'An organic activation platform, useful functional-group compatibility, and new molecular designs. The thiol additive test illustrates the opportunity: 65% NMR yield with hydrazine, versus 0% with Grubbs I.',
      ),
      aside: {
        title: 'Manuscript status',
        text: 'Metal-Free Ring Closing Olefin Metathesis — Chengyi Fan, Lichen Huang and Tristan Lambert, Cornell University. Preparing for journal submission. A public paper or preprint link will be added when available.',
      },
    },
  ],
}
