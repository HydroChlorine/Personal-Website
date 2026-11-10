import type { ArticleFigure, ProjectArticle } from '../../types.ts'
import { chemistryExperienceCards } from './index.ts'

export interface ChemistryExperience {
  slug: string
  title: string
  summary: string
  course: 'CHEM 3020' | 'CHEM 3030'
  preview: string
  previewAlt: string
  article: ProjectArticle
}
const root = '/media/chemistry/experiences/'
function figure(name: string, alt: string, caption: string): ArticleFigure {
  return {
    src: `${root}${name}.svg`,
    mobileSrc: `${root}${name}-mobile.svg`,
    width: 900,
    height: 600,
    mobileHeight: 1000,
    alt,
    caption,
    pixel: {
      gif: `${root}${name}-pixel.gif`,
      still: `${root}${name}-pixel.png`,
      mobileGif: `${root}${name}-pixel-mobile.gif`,
      mobileStill: `${root}${name}-pixel-mobile.png`,
    },
    crisp: {
      gif: `${root}${name}-crisp.gif`,
      mobileGif: `${root}${name}-crisp-mobile.gif`,
    },
  }
}
type Section = ProjectArticle['sections'][number]
function scene(
  id: string,
  title: string,
  paragraphs: string[],
  name: string,
  alt: string,
  caption: string,
  extra: Partial<Section> = {},
): Section {
  return { id, title, paragraphs, figure: figure(name, alt, caption), ...extra }
}
function experience(
  slug: string,
  introduction: string[],
  sections: Section[],
): ChemistryExperience {
  const card = chemistryExperienceCards.find((item) => item.slug === slug)
  if (!card) throw new Error(`Missing chemistry experience: ${slug}`)
  return {
    ...card,
    article: {
      kind: 'experience',
      subject: 'chemistry',
      kicker: `${card.course} / A MOMENT FROM THE LAB`,
      introduction,
      sections,
      detailsLabel: 'A little closer / notes & references',
      reviewed: '2026-11-10',
    },
  }
}
export const chemistryExperiences: ChemistryExperience[] = [
  experience(
    'tonic-water-fluorescence',
    [
      'The sample was an ordinary bottle of tonic water. The question sounded simple: how much quinine was inside, and what could its fluorescence tell us about chloride? The instrument made that question much more interesting.',
      'I remember a large background and unreliable weak signals. Rather than treating dilution as a complete fix, I tried to account for concentration and quenching together. This is the story of that choice—and what the surviving readings can actually support.',
    ],
    [
      scene(
        'glow',
        'A glow with more than one cause',
        [
          'Quinine can absorb light and emit some of that energy as fluorescence. Chloride can open a competing route for losing the excitation, making the solution dimmer. Brightness therefore mixes two questions: how much quinine is present, and how strongly its surroundings suppress the glow?',
          'That entanglement was the interesting part. The interferent was also something we wanted to learn about.',
        ],
        'tonic-quenching',
        'Excitation leads either to an emitted photon or to a competing nonradiative pathway during a chloride encounter.',
        'A conceptual picture of quenching. The moving dots illustrate competing pathways, not molecular trajectories or measured rates.',
        {
          sources: [
            {
              label: 'IUPAC: Stern–Volmer relationship',
              href: 'https://goldbook.iupac.org/terms/view/S06004',
            },
          ],
        },
      ),
      scene(
        'dilution',
        'Diluting solves one problem and introduces another',
        [
          'Dilution weakens the effect of chloride, but also takes away quinine signal. Eventually the background becomes a large part of what the instrument sees. More dilution is not automatically a better measurement.',
          'I explored salt additions at two dilutions, trying to extract more information from how the signal changed instead of trusting one faint reading.',
        ],
        'tonic-dilution',
        'Dilution reduces encounters while a declining signal approaches an illustrative noisy background.',
        'An illustration of the measurement tradeoff. The background and noise here are synthetic, not reconstructed blank measurements.',
      ),
      scene(
        'ranges',
        'Two dilutions, one shared story',
        [
          'My approach was to link both dilution series to the same original drink. Adding a known amount of chloride changes the quenching; changing the dilution changes the native chloride already present. Fitting those responses together offered a way to ask about quinine and chloride jointly.',
          'That comparison needs the instrument calibration, too. The appendix preserves an important clue: the two runs used different calibrations. At 1000-fold dilution, 0.25 ppm corresponded to 500 fluorescence units; at 100-fold dilution, 2.5 ppm corresponded to the same display value.',
          'The sensitivity changed by a factor of ten alongside the dilution. Nearly equal starting readings therefore do not, by themselves, demonstrate a faulty instrument. Re-reading that detail matters just as much as designing a new model.',
        ],
        'tonic-calibration',
        'Two cuvettes compare 1000-fold and 100-fold dilution with tenfold different fluorescence calibration slopes.',
        'Calibration values transcribed from the embedded script on page 36 of my report. Sensitivity divided by dilution equals 2 in both runs.',
      ),
      scene(
        'readings',
        'What the response could tell me',
        [
          'The salt-addition series clearly became dimmer. My model tried to connect that response to the undiluted drink, rather than use dilution alone. It was an early experience of making the mathematical model part of the experiment.',
          'The report gives a quinine estimate of about 67 ppm. The chloride estimate remained too uncertain to call a precise measurement, but the exercise gave me a more useful way to think about an interfering signal: sometimes its response is information we can work with.',
          'What I still like is the question: when an instrument is awkward, can a better choice of measurements and model help us ask more of it?',
        ],
        'tonic-readings',
        'Seven recorded fluorescence readings decrease as added chloride increases, with the two dilution series distinguished by color.',
        'Recorded points from report page 24. Cyan: 1000-fold dilution; gold: 100-fold. Added chloride accounts for the small added volume. No newly validated fit is overlaid.',
        {
          aside: {
            title: 'A small connection to a bigger question',
            text: 'Choosing the next measurement is also an interpolation problem: where would another observation teach us the most?',
          },
          detailParagraphs: [
            'A simple dynamic-quenching model writes F = F₀ / (1 + K[Cl⁻]). The original analysis linked dilution series through the stock solution. A full reanalysis should also account for calibrated sensitivity, background and the small volume change on adding salt; the pictures here do not claim a newly validated fit.',
            'The aliquots were 5000 µL and the salt stock was 6.14 M. The five 1000-fold readings were 137.1, 74.4, 61.5, 52.4 and 48.9 fsu at additions of 0, 10, 20, 30 and 40 µL. The 100-fold readings were 127.4 and 48.5 fsu at 0 and 10 µL.',
            'The fitted chloride value sits at a search bound. The reported chloride result, 0.1000 ± 0.3261 M, is not a strong determination. A quenching experiment probes chloride; it does not independently measure sodium. The recalled brand is Schweppes from Wegmans; the exact bottle size and lot are unconfirmed.',
          ],
        },
      ),
    ],
  ),
  experience(
    'two-peaks-become-one',
    [
      'One of my favorite laboratory observations was a pair of NMR peaks gradually broadening and merging as the temperature changed. A spectrum that looks static can carry a story about motion.',
    ],
    [
      scene(
        'exchange',
        'The molecule has a clock, too',
        [
          'Two environments can give different resonance frequencies. If exchange between them is slow compared with their frequency separation, the spectrum can distinguish them. Faster exchange changes what the instrument resolves.',
          'This is about the rate of switching between environments, not about two atoms suddenly becoming identical.',
        ],
        'nmr-exchange',
        'A molecular marker switches slowly or quickly between two labeled environments.',
        'An abstract exchange sketch. The squares are environments, not a proposed bond-breaking mechanism.',
      ),
      scene(
        'coalescence',
        'Watch the space between the peaks disappear',
        [
          'In the lab, warming the sample moved the spectrum from separated peaks through broadening toward a single averaged feature. That middle region is especially revealing: the line shape carries information about the exchange rate.',
          'The animation lets us vary just the rate while holding the frequency separation fixed. Real temperature changes can affect more than one parameter.',
        ],
        'nmr-coalescence',
        'An equal-population two-site exchange spectrum evolves from two peaks toward one as the exchange rate increases.',
        'Calculated teaching spectra from a two-site exchange model; these are not digitized laboratory spectra.',
      ),
      scene(
        'fitting',
        'A curve fit is also a choice of picture',
        [
          'I used the supplied NMR simulation and fitting tools to compare line shapes with the measurements. The software made it possible to connect a visible change to a molecular timescale.',
          'It also made me pay more attention to assumptions. Similar-looking central peaks can have quite different tails. A fitted number deserves a look at the whole curve, not just the best-looking part.',
        ],
        'nmr-lineshapes',
        'Gaussian and Lorentzian peaks agree near their centers but differ in their tails.',
        'Illustrative Gaussian and Lorentzian profiles, not alternative fitted results from this experiment. The lab work used the provided Igor NMR tools.',
      ),
    ],
  ),
  experience(
    'spinach-fluorescence',
    [
      'A leaf is a busy mixture. Extracting its pigments and looking at their fluorescence turned something familiar into a surprisingly rich measurement problem.',
    ],
    [
      scene(
        'separate',
        'Follow the color through the separation',
        [
          'Extraction brought the pigments into solution; chromatography separated fractions with different appearances. A colored band was a useful guide, but it was not a complete identification or a guarantee of purity.',
          'The next step was to ask how a selected chlorophyll-containing fraction behaved under light.',
        ],
        'spinach-separation',
        'A stylized leaf, chromatography column and separated colored sample tubes show the path from spinach to a fraction.',
        'An original overview of extraction and fraction collection, rather than a recording of the apparatus.',
      ),
      scene(
        'light',
        'The cuvette is part of the story',
        [
          'At low concentration, a larger amount of fluorescent material can produce a larger signal. At higher concentration, the sample can absorb the excitation near the entrance, and emitted light may be reabsorbed before reaching the detector.',
          'That means the detector does not always see a representative sample of every molecule inside. Geometry and optical density begin to matter.',
        ],
        'chlorophyll-light',
        'Light penetrates farther into a dilute cuvette than into a more strongly absorbing one.',
        'A schematic optical comparison. It suggests effects worth checking; it does not uniquely diagnose the measured plateau.',
      ),
      scene(
        'plateau',
        'More pigment did not mean proportionally more signal',
        [
          'My readings rose and then flattened near 500 fluorescence units. The bend is easy to see; explaining it is the harder part.',
          'Inner-filter effects, detector limits, and concentration-dependent interactions are all reasons to investigate further. I would not turn this curve alone into proof of a single quenching mechanism or a precise intermolecular distance.',
        ],
        'chlorophyll-readings',
        'Eight measured fluorescence points rise from 168 to about 500 units as concentration increases.',
        'Eight reported readings, at 0.909–7.5 µM, transcribed from page 5 of my report. No fitted mechanism is imposed on the points.',
      ),
    ],
  ),
  experience(
    'beyond-the-library-match',
    [
      'I brought familiar solid samples into an infrared experiment and learned how persuasive a library result can look—even when it deserves a second look.',
    ],
    [
      scene(
        'clue',
        'A resemblance is the beginning',
        [
          'For a berberine sample, a leading search suggestion was a different compound. The software had found similarities in the measured pattern. It had not established the identity of everything in the sample.',
          'The useful response was to inspect characteristic bands, sample preparation, and alternative explanations instead of simply copying the top name.',
        ],
        'library-clues',
        'Two illustrative infrared traces share some peaks while differing in other diagnostically useful regions.',
        'Synthetic spectra illustrating partial resemblance. No commercial library spectrum or interface is reproduced.',
      ),
      scene(
        'mixture',
        'The tablet contributes more than its active ingredient',
        [
          'A formulated roxithromycin tablet returned a strong lactose match. That is a reminder that a tablet is a mixture: excipients can dominate an infrared response.',
          'Seeing an excipient is not evidence that the active ingredient is absent, nor does this measurement establish a manufacturing problem. The analytical question needs to match what the method can actually see.',
        ],
        'tablet-contributions',
        'An abstract tablet separates into several contributing components whose signals combine.',
        'A conceptual mixture sketch, without product-content claims or inferred ingredient quantities.',
      ),
      scene(
        'contact',
        'How we sample changes what we see',
        [
          'Contact with an ATR crystal, a coating on a surface, or a different preparation can change which part of a material contributes most strongly. A spectrum belongs to a measurement arrangement as well as to a substance.',
          'The experience made library searching more useful to me: it became a way to propose questions, rather than a way to stop asking them.',
        ],
        'ftir-sampling',
        'Different sample contact arrangements emphasize different material layers.',
        'An illustration of sampling sensitivity. The drawing is not a claim about leaching, safety, or a specific commercial material.',
      ),
    ],
  ),
  experience(
    'five-dyes-one-spectrum',
    [
      'A mixture of indicators turns a single visible color into a small inverse problem. The ingredients overlap, and some become difficult to see at all.',
    ],
    [
      scene(
        'combine',
        'Let the full shape help',
        [
          'Each dye has its own wavelength-dependent response. With suitable reference spectra measured under matching conditions, we can try to express the mixture as a weighted combination of those responses.',
          'Instead of choosing one convenient wavelength, I used more of the spectral shape to help separate overlapping contributions.',
        ],
        'dye-mixture',
        'Five component spectra combine into a single mixture spectrum.',
        'Synthetic component curves illustrate linear spectral unmixing; they are not the measured dye reference spectra.',
      ),
      scene(
        'visibility',
        'A missing color is missing information',
        [
          'The five indicators included bromothymol blue, thymol blue, methyl orange, methyl red, and phenolphthalein. Their responses depend on pH.',
          'Phenolphthalein is largely colorless in acidic solution. A visible-spectrum fit cannot confidently recover an ingredient that barely contributes a visible signal, however carefully the optimizer is written.',
        ],
        'dye-visibility',
        'One component fades from the visible response while the other colored contributions remain.',
        'A conceptual loss-of-visibility illustration. Acidic phenolphthalein is colorless; this is not a calibration of its speciation.',
      ),
      scene(
        'ambiguity',
        'Different recipes can look almost the same',
        [
          'Similar component spectra can trade off against one another in a fit. A small residual does not guarantee that each recovered amount is well determined.',
          'The interesting lesson was experimental: changing pH or selecting a better reference condition can create information that another round of fitting cannot.',
        ],
        'dye-tradeoffs',
        'Different component weights produce similar combined curves and small residuals.',
        'Synthetic fits show ambiguity rather than actual recovered concentrations. Matched pH and reference conditions are essential.',
      ),
    ],
  ),
  experience(
    'ions-in-flight',
    [
      'Working with the course’s homebuilt time-of-flight apparatus made mass spectrometry feel much less like an opaque box. The key observation was simply when an ion arrived.',
    ],
    [
      scene(
        'flight',
        'Give ions a push, then time the journey',
        [
          'For equal charge and accelerating voltage, lighter ions generally travel faster. A detector converts their arrival into a timing signal, which becomes a clue about mass-to-charge ratio.',
          'The apparatus was already built for the course; my work was in operating it, examining the signals, and interpreting the measurements.',
        ],
        'ion-flight',
        'Illustrative ions with different masses travel through a flight region and arrive at different times.',
        'A simplified flight model. Under the stated equal-charge conditions, flight time scales with the square root of mass.',
      ),
      scene(
        'focus',
        'The starting position should not decide the answer',
        [
          'Ions do not begin at one perfectly identical point. Differences in starting position and energy can spread an arrival peak.',
          'Time focusing uses the acceleration geometry to reduce sensitivity to some of those differences. It is a beautiful example of designing an instrument around the error we want to suppress.',
        ],
        'ion-focusing',
        'A broad range of illustrative ion paths is compared with an arrangement that brings arrivals closer together.',
        'A conceptual focusing sketch, not a ray-traced reconstruction of the course apparatus.',
      ),
      scene(
        'threshold',
        'Change the light, watch a channel appear',
        [
          'Scanning photon energy adds another question: when does an ionization channel become accessible? A signal that turns on can reveal an energetic threshold.',
          'The interpretation still depends on calibration and on how the onset is defined. The picture is useful without pretending that an ideal sharp threshold is what every experiment measures.',
        ],
        'ion-threshold',
        'An illustrative ion signal appears as photon energy crosses a threshold.',
        'Synthetic onset curves; no numerical threshold or lifetime is claimed from this animation.',
      ),
    ],
  ),
  experience(
    'a-reaction-in-fading-color',
    [
      'The changing color was easy to watch. Turning it into a useful rate measurement required choosing what that color should mean.',
    ],
    [
      scene(
        'crossing',
        'Find a wavelength that makes the question simpler',
        [
          'Bromine and tribromide contribute differently at many wavelengths. Near an isosbestic wavelength their absorptivities match, which can reduce the influence of how the bromine is partitioned between those forms.',
          'That lets the measurement follow a more useful combined quantity instead of confusing a speciation shift with reaction progress.',
        ],
        'reaction-crossing',
        'Two synthetic absorption spectra cross at a highlighted wavelength with equal response.',
        'Illustrative crossing at 440 nm. The report used crossings near 426 and 444 nm; the animation is not a measured spectrum.',
      ),
      scene(
        'clock',
        'Turn absorbance into a clock',
        [
          'Monitoring the reaction with excess ketone and acid let me compare changes in the bromine signal across conditions. A nearly straight decline can be informative: under those conditions, the rate need not depend strongly on the remaining bromine.',
          'The useful picture is a signal changing with time, followed by a careful question about which variable changed its slope.',
        ],
        'reaction-clock',
        'A colored sample fades alongside an illustrative time trace and fitted slope.',
        'Synthetic progress curves illustrate a rate comparison, not reconstructed kinetic data.',
      ),
      scene(
        'isotope',
        'Change hydrogen, change the pace',
        [
          'A separate acetone experiment compared hydrogen-containing and deuterated reactants. A substantial rate difference made bond motion part of the story.',
          'An isotope effect can support a mechanistic interpretation, but it does not identify every step by itself. I liked how a small change in atomic mass could become such a visible change in a clock.',
        ],
        'reaction-isotopes',
        'Hydrogen and deuterium labels accompany reaction traces that decay at different illustrative rates.',
        'A qualitative kinetic isotope effect. This acetone comparison is distinct from the cyclopentanone initial-rate series.',
      ),
    ],
  ),
  experience(
    'heat-by-a-different-route',
    [
      'A calorimeter records a temperature change. A thermochemical cycle lets us use that observation to ask about a transformation we did not measure directly.',
    ],
    [
      scene(
        'cycle',
        'Take two routes to the same destination',
        [
          'If two starting materials can be taken to matching final products, the difference between the route enthalpies connects their starting states. Hess’s law turns a difficult direct measurement into bookkeeping around a cycle.',
          'The attractive part is that the route can change while the state-function relationship remains. Matching stoichiometry is essential.',
        ],
        'heat-cycle',
        'Two schematic starting states connect through combustion paths to a common set of products.',
        'A conceptual Hess cycle. Drawing height does not encode measured energy, and no reported heat value is reproduced.',
      ),
      scene(
        'trace',
        'The temperature trace needs a reference',
        [
          'The useful signal sits on top of thermal drift and the instrument’s own response. Calibration converts a temperature rise into an energy estimate.',
          'I had to think about where the baseline should be drawn and what part of a changing trace represented the event of interest.',
        ],
        'heat-trace',
        'An illustrative calorimeter trace rises above a drifting baseline.',
        'Synthetic temperature data, not a recovered experimental trace.',
      ),
      scene(
        'difference',
        'A small difference can inherit large uncertainty',
        [
          'Subtracting two large quantities can leave a much smaller answer. That answer can be sensitive to calibration, baseline choices, and any errors shared between the two measurements.',
          'The cycle is exact as thermodynamic bookkeeping; the experiment supplying its numbers still needs care. That contrast made this lab memorable.',
        ],
        'heat-difference',
        'Two large illustrative energy measurements and their much smaller difference are compared.',
        'Illustrative magnitudes only. The report’s sign and uncertainty bookkeeping would need rechecking before quoting a numerical result.',
      ),
    ],
  ),
  experience(
    'isotopes-in-the-infrared',
    [
      'The infrared sequence mixed measured work, supplied digital spectra, and simulations. Looking across them helped connect a pattern of lines to molecular motion.',
    ],
    [
      scene(
        'mass',
        'Keep the bond, change the mass',
        [
          'Replacing hydrogen with deuterium changes the reduced mass of a vibration much more than it changes the underlying bonding picture. A heavier oscillator generally vibrates more slowly.',
          'That shift makes isotopic substitution a way to test whether our assignment of a feature makes sense.',
        ],
        'ir-isotopes',
        'Two schematic bond oscillators with different masses are shown beside shifted infrared features.',
        'A qualitative harmonic-oscillator comparison inspired by HCl/DCl; the motion is not a fitted trajectory.',
      ),
      scene(
        'population',
        'A line pattern also remembers temperature',
        [
          'A rotational-vibrational spectrum contains many transitions. Their relative strengths depend in part on how the starting rotational states are populated.',
          'Changing the model temperature redistributes those populations. A spectrum is therefore more than a list of allowed frequencies: it also reflects which states are occupied.',
        ],
        'ir-populations',
        'A calculated rotational population envelope shifts among angular-momentum states as illustrative temperature changes.',
        'A rigid-rotor Boltzmann teaching model, rather than measured line intensities.',
      ),
      scene(
        'assignment',
        'Connect the comb of lines to a model',
        [
          'The goal was to make assignments that remained consistent across a family of transitions and isotopic examples, including the supplied methane-related spectra.',
          'One attractive match is not enough. A model becomes convincing when it explains how several features move together.',
        ],
        'ir-assignments',
        'An illustrative comb of spectral lines is linked to transition assignments.',
        'Synthetic line positions. Some source spectra were supplied course data; this page does not claim that I acquired all of them.',
      ),
    ],
  ),
  experience(
    'the-empty-cell-spectrum',
    [
      'Before asking what the liquid absorbed, I had to ask why an empty cell already showed structure. The measuring container had become part of the optical experiment.',
    ],
    [
      scene(
        'paths',
        'Light can take more than one path',
        [
          'Reflections between cell windows create paths with different optical lengths. When those contributions recombine, they can interfere.',
          'What first looked like an unhelpful background became a clue about the measurement geometry.',
        ],
        'empty-cell-paths',
        'Light passes between two windows while a reflected path travels farther before recombining.',
        'A simplified multiple-path sketch. Geometrical travel and optical path difference are not interchangeable.',
      ),
      scene(
        'fringes',
        'A repeating pattern can reveal a length scale',
        [
          'A periodic fringe pattern in wavenumber can be related to optical thickness. The spacing carries information even though the empty cell contains no analyte.',
          'The right interpretation depends on the refractive index, incidence, and which reflections matter.',
        ],
        'empty-cell-fringes',
        'A synthetic periodic infrared fringe pattern changes as illustrative optical thickness changes.',
        'Teaching fringes, not a reproduced cell measurement or a claimed path-length determination.',
      ),
      scene(
        'residual',
        'Make a guess, then inspect what is left',
        [
          'For mixtures, subtracting a guessed component contribution can make a mismatch easier to see. A remaining peak is a question about the model, not just an inconvenient error.',
          'This was an early lesson in looking at residual structure instead of relying on one overall goodness-of-fit number.',
        ],
        'mixture-residual',
        'A changing guessed component leaves a structured residual that becomes smaller near a better match.',
        'Synthetic spectra illustrate residual inspection; they do not reconstruct the experiment’s mixture composition.',
      ),
    ],
  ),
  experience(
    'sweeping-the-voltage',
    [
      'Cyclic voltammetry made the instrument feel active: we changed the potential and watched the chemistry answer through current.',
    ],
    [
      scene(
        'sweep',
        'Push, reverse, and watch the response',
        [
          'Sweeping the potential can drive oxidation or reduction at the electrode. Reversing the sweep asks whether the transformed material can respond on the way back.',
          'The resulting loop contains more information than a single current reading. Its shape depends on both chemistry and transport.',
        ],
        'cv-sweep',
        'A potential scan moves forward and backward while an illustrative current–potential loop is traced.',
        'A schematic voltammogram. Potentials are relative teaching coordinates, not values versus a specified experimental reference electrode.',
      ),
      scene(
        'speed',
        'Changing the pace changes the question',
        [
          'A faster sweep gives the system less time to transport material and complete coupled steps. Comparing scan rates can therefore reveal behavior hidden in one trace.',
          'For an ideal diffusion-controlled reversible case, peak current scales with the square root of scan rate. Real data need checking before using that relationship as a diagnosis.',
        ],
        'cv-speed',
        'Illustrative voltammograms grow as the scan rate increases.',
        'A simplified diffusion-controlled comparison, not proof that every measured redox process was reversible.',
      ),
      scene(
        'solution',
        'The solution is part of the circuit',
        [
          'The lab also connected electrochemistry with pH and acetaminophen analysis. The chemical form present in solution can alter the response we calibrate.',
          'The practical lesson was to keep the sample conditions tied to the calibration, rather than treat the instrument reading as a universal concentration meter.',
        ],
        'cv-solution',
        'A sample environment changes beside an illustrative electrochemical response.',
        'A conceptual pH and response sketch, without conclusions about medicine quality or manufacturing.',
      ),
    ],
  ),
  experience(
    'a-mixture-over-one-hundred-percent',
    [
      'The reported component estimates added to 113.93%. That was an unusually clear invitation to stop trusting the final column of numbers and revisit the route that produced it.',
    ],
    [
      scene(
        'separate',
        'Separate the mixture before counting it',
        [
          'Gas chromatography spreads a mixture into peaks with different retention times. Integrating a peak gives a response, which still needs a suitable calibration to become an amount.',
          'Peak area is not automatically mass fraction: different compounds can have different detector responses.',
        ],
        'gc-separation',
        'Several synthetic chromatographic peaks emerge at distinct retention times.',
        'Synthetic peaks illustrate separation; these are not reconstructed chromatograms.',
      ),
      scene(
        'total',
        'Let the total challenge the answer',
        [
          'The estimates in my report were 26.10%, 61.92%, and 25.91%. Their sum exceeds a physically possible mass fraction total for those components.',
          'The inconsistency does not tell us one unique cause. It does tell us to inspect calibration, units, dilution accounting, peak integration, and the sample model before interpreting the composition.',
        ],
        'gc-total',
        'Bars labeled with the three reported percentages sum to 113.93%, beyond the 100% reference.',
        'The three percentages are reported values; the animated bars are an explanatory reconstruction, not validated composition measurements.',
      ),
      scene(
        'ratio',
        'A ratio can cancel an error—or conceal an assumption',
        [
          'An internal-standard ratio can remove a common injection-size factor. It can still work when the standard is naturally present, provided the procedure and the standard amount are handled consistently.',
          'The useful lesson is to trace what cancels and what does not. Normalizing everything to 100% would hide the warning without repairing its cause.',
        ],
        'gc-ratios',
        'A common scale change affects two signals together while their ratio stays fixed.',
        'An illustrative ratio model. Native presence of a standard does not, by itself, invalidate ratio-based quantitation.',
        {
          sources: [
            {
              label: 'NIST: Principles of quantitation in chromatography',
              href: 'https://www.nist.gov/publications/principles-quantitation-chromatography',
            },
          ],
        },
      ),
    ],
  ),
  experience(
    'tea-and-an-unexpected-answer',
    [
      'The plan was to estimate caffeine-related components in tea. The surprising part was how easily a plausible measurement could become a fragile calculation.',
    ],
    [
      scene(
        'overlap',
        'Similar shapes are hard to pull apart',
        [
          'Caffeine and theophylline have overlapping ultraviolet responses. Separating their contributions means asking small spectral differences to carry a lot of information.',
          'When two reference shapes are similar, small errors in a signal can become large changes in the inferred amounts.',
        ],
        'tea-overlap',
        'Two similar ultraviolet profiles overlap strongly, making their combined signal difficult to separate.',
        'Synthetic spectra illustrate overlap; they are not measured tea spectra.',
      ),
      scene(
        'recovery',
        'Extraction is another measurement step',
        [
          'Moving material between phases does not guarantee complete recovery. The report’s two extraction-fraction estimates differed, reminding me that sample preparation can matter as much as the final instrument.',
          'A calibrated detector cannot compensate for material that never reaches the measured solution unless recovery is accounted for.',
        ],
        'tea-extraction',
        'A schematic two-phase extraction transfers part of a dissolved component into a second phase.',
        'A conceptual recovery illustration, not a solvent-handling procedure or an exact reconstruction of the glassware.',
      ),
      scene(
        'unexpected',
        'An impossible estimate is useful feedback',
        [
          'A negative fitted contribution is not a negative concentration inside the drink. It is a warning that uncertainty, overlap, background, or the model is pushing the calculation outside a physically meaningful range.',
          'The productive next step is to investigate those assumptions. This lab made me much more interested in the stability of an answer, rather than just whether a program can produce one.',
        ],
        'tea-estimates',
        'Noisy illustrative observations produce a spread of component estimates, including some below zero.',
        'Synthetic estimates demonstrate instability. They are not nutritional measurements or evidence for one specific cause of the original discrepancy.',
      ),
    ],
  ),
  experience(
    'a-half-life-in-noisy-counts',
    [
      'Counting experiments put randomness in plain view. Repeating a measurement did not produce the same number every time, but that variation itself had a pattern.',
    ],
    [
      scene(
        'counts',
        'Random does not mean structureless',
        [
          'For independent events at a steady average rate, a Poisson model describes the number of counts in a fixed interval. Low-count distributions can be visibly asymmetric; higher counts look more nearly bell-shaped.',
          'The uncertainty is part of the observation, rather than an extra nuisance attached afterward.',
        ],
        'count-distributions',
        'Poisson probability bars compare a low expected count with a higher expected count.',
        'Calculated Poisson distributions, not detector measurements. Zero counts are a possible outcome.',
      ),
      scene(
        'decay',
        'The background becomes important at the end',
        [
          'A decaying signal becomes harder to distinguish from background as time passes. Ignoring a constant background can distort an apparent decay, especially in the late portion.',
          'The useful model includes both the changing source and what the detector would record without that source contribution.',
        ],
        'count-decay',
        'An exponential decay is compared with a decay containing a constant background.',
        'Synthetic decay curves. For the original report, a lost decay file was replaced with data shared by Stephanie Chen with TA approval; none of that shared dataset is reproduced here.',
      ),
      scene(
        'window',
        'Which part of the trace belongs in the fit?',
        [
          'Early transients and late weak counts can ask different things of a model. Selecting a fitting window should follow the physical question and residual behavior, rather than whichever interval gives the nicest number.',
          'The experience connected counting statistics, instrument behavior, and model choice in one very concrete way.',
        ],
        'count-window',
        'An illustrative count trace with an early transient is inspected over a highlighted fitting interval.',
        'Synthetic time data. The highlighted interval demonstrates a question to investigate, not a prescribed universal cutoff.',
      ),
    ],
  ),
  experience(
    'four-unknowns',
    [
      'The final lab felt different from following one established route. With several unknown samples, the first task was deciding which measurements would make an answer believable.',
    ],
    [
      scene(
        'question',
        'Identification and amount are different questions',
        [
          'A spectral pattern can suggest what is present. Determining how much is present requires a response model, reference measurements, and consistent units.',
          'I had to keep those two tasks connected without treating success at one as automatic success at the other.',
        ],
        'unknown-samples',
        'Four stylized sample tubes lead to separate questions about identity and quantity.',
        'An original summary illustration, not photographs of the submitted unknown samples.',
      ),
      scene(
        'shape',
        'Use the spectrum as a check',
        [
          'Looking across wavelengths can reveal whether a single-point estimate fits the broader shape. Disagreement invites a check for interference, baseline issues, or mismatched reference conditions.',
          'Nearby wavelengths are correlated observations, though. They do not become independent experimental replicates simply because there are many of them.',
        ],
        'unknown-wavelengths',
        'Multiple highlighted wavelengths sample an illustrative absorption profile.',
        'Synthetic spectral checks; no unknown concentrations are reconstructed.',
      ),
      scene(
        'judgment',
        'Agreement is something to earn',
        [
          'Different calibration choices can give different answers with deceptively small fitting errors. Before combining them, I want to understand what each assumes and whether they share the same bias.',
          'The satisfying part of the practical was making a chain of choices I could explain: what I measured, why I measured it, and what I was prepared to conclude.',
        ],
        'unknown-calibration',
        'Two illustrative calibration lines map the same measured response to different inferred concentrations.',
        'A teaching comparison. Averaging inconsistent calibrations does not automatically remove a common systematic error.',
      ),
    ],
  ),
]
