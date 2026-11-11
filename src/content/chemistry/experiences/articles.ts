import type { ArticleFigure, ProjectArticle } from '../../types.ts'
import { chemistryExperienceCards } from './index.ts'

export interface ChemistryExperience {
  slug: string
  title: string
  summary: string
  category: 'Analytical chemistry' | 'Physical chemistry'
  preview: string
  previewGif: string
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
function snippet(
  slug: string,
  introduction: string[],
  sections: Section[],
): ChemistryExperience {
  const card = chemistryExperienceCards.find((item) => item.slug === slug)
  if (!card) throw new Error(`Missing chemistry snippet: ${slug}`)
  return {
    ...card,
    article: {
      kind: 'snippet',
      subject: 'chemistry',
      kicker: 'CHEMISTRY / FROM MY LAB NOTES',
      introduction,
      sections,
      detailsLabel: 'A little closer / notes & references',
      reviewed: '2026-11-11',
    },
  }
}
export const chemistryExperiences: ChemistryExperience[] = [
  snippet(
    'tonic-water-fluorescence',
    [
      'I wanted to determine the quinine concentration in a commercial tonic water and investigate how much chloride was suppressing its fluorescence. That turns an ordinary drink into a coupled measurement: quinine produces the blue glow, while chloride makes it weaker.',
      'The fluorimeter was difficult to work with at low signal. Instead of relying only on a highly diluted sample, I developed a linked analysis of salt additions at two dilutions. The useful idea was to treat the interference as something to model and measure.',
    ],
    [
      scene(
        'glow',
        'One drink, two quantities to untangle',
        [
          'After absorbing ultraviolet light, an excited quinine molecule can release some of that energy as fluorescence. A competing nonradiative process returns it to the ground state without an emitted photon. Chloride acts as a quencher: encounters with it can make that competing route more likely.',
          'A dim reading could therefore mean less quinine, more quenching, or an instrumental background that is large relative to the signal. I first needed quinine calibration measurements and a controlled way to vary the chloride concentration.',
        ],
        'tonic-quenching',
        'Excitation leads either to an emitted photon or to a competing nonradiative pathway during a chloride encounter.',
        'A conceptual picture of quenching. The moving dots illustrate competing pathways, not molecular trajectories or measured rates.',
      ),
      scene(
        'stern-volmer',
        'Put a number on the lost glow',
        [
          'Stern–Volmer analysis compares fluorescence without quencher, F₀, with fluorescence after adding a known quencher concentration, [Q]. In the simple dynamic-quenching model, plotting F₀/F against [Q] gives a straight line. Its slope, KSV, describes how strongly that quencher suppresses emission under those conditions.',
          'The comparison must keep the quinine concentration and instrument response consistent, with the background accounted for. The relation is a model to test, rather than a rule that every fluorescence curve must follow. In tonic water, the starting sample already contains chloride, so the first reading is not automatically the unquenched F₀.',
        ],
        'tonic-stern-volmer',
        'A declining fluorescence curve becomes a straight line when expressed as the unquenched-to-quenched intensity ratio.',
        'The simple Stern–Volmer model, illustrated with synthetic values: the intensity falls while F₀/F rises linearly.',
        {
          equations: [
            {
              label:
                'Simple dynamic quenching, with matched measurement conditions',
              expression: 'F₀ / F = 1 + KSV[Q]',
            },
          ],
          sources: [
            {
              label: 'IUPAC: Stern–Volmer kinetic relationships',
              href: 'https://goldbook.iupac.org/terms/view/S06004',
            },
          ],
        },
      ),
      scene(
        'dilution',
        'Dilution helps, until the signal becomes too small',
        [
          'Diluting the drink reduces the chloride concentration, but it also reduces the amount of quinine being observed. At sufficiently low fluorescence, a small background or reading error becomes a large fraction of the signal. That was the practical reason to try something beyond simply diluting further.',
          'I measured a series of known salt additions to a 1000-fold dilution and a shorter series at 100-fold dilution. Each addition changed the quenching in a known direction. Looking at a response curve gave more information than trying to interpret one weak reading.',
        ],
        'tonic-dilution',
        'Dilution reduces encounters while a declining signal approaches an illustrative noisy background.',
        'An illustration of the measurement tradeoff. The background and noise here are synthetic, not reconstructed blank measurements.',
      ),
      scene(
        'ranges',
        'Link both dilution series to the same bottle',
        [
          'I fitted the two series through a shared picture of the original drink: native chloride is diluted by the sample preparation, added chloride is known, and the fluorescence scale is related to the quinine calibration. Changing the dilution provides a second view of the same underlying composition.',
          'The runs used different calibrations: 0.25 ppm quinine corresponded to 500 fluorescence units in the 1000-fold run, while 2.5 ppm corresponded to 500 in the 100-fold run. This tenfold sensitivity change matters. Similar displayed readings at the two dilutions are compatible with very different concentrations in the cuvette.',
        ],
        'tonic-calibration',
        'Two cuvettes compare 1000-fold and 100-fold dilution with tenfold different fluorescence calibration slopes.',
        'Calibration values transcribed from the embedded script on page 36 of my report. Sensitivity divided by dilution equals 2 in both runs.',
        {
          detailParagraphs: [
            'A simplified linked model has the form F(d,x) = A(d) / {1 + KSV[CCl/d + x]}, where d is dilution, x is added chloride and A(d) is the calibrated unquenched signal. A full fit also needs consistent baseline treatment and the small volume change caused by salt addition. Multiple curves add constraints, but do not guarantee that every parameter is well determined.',
          ],
        },
      ),
      scene(
        'readings',
        'What the measurements actually supported',
        [
          'The recorded fluorescence fell from 137.1 to 48.9 units across the five salt additions at 1000-fold dilution. The report estimated about 67 ± 9 ppm quinine in the original drink. That is a reported result from this analysis, rather than an independently revalidated concentration.',
          'The chloride estimate was much less secure: its uncertainty was larger than the estimate, and the fit reached a parameter bound. I could use the curve to demonstrate substantial quenching, but not claim a precise determination of native chloride from this dataset.',
          'The part I value is the change in strategy: instead of treating an interfering species only as a nuisance to remove, I tried to use its controlled response to learn more about the sample.',
        ],
        'tonic-readings',
        'Seven recorded fluorescence readings decrease as added chloride increases, with the two dilution series distinguished by color.',
        'Recorded points from my report, page 24. Cyan: 1000-fold dilution; gold: 100-fold. Added chloride accounts for the small added volume. No newly validated fit is overlaid.',
        {
          detailParagraphs: [
            'The fitted native chloride value was 0.1000 ± 0.3261 M and sat at the upper search bound. That is a warning about how weakly this parameter was constrained. Chloride quenching does not independently determine sodium.',
            'The 5000 µL aliquots received 0, 10, 20, 30 and 40 µL of 6.14 M salt stock. Fluorescence was 137.1, 74.4, 61.5, 52.4 and 48.9 units; the 100-fold series gave 127.4 and 48.5 units at 0 and 10 µL. The plotted added concentration includes the added volume.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'two-peaks-become-one',
    [
      'Two methyl groups in a para-substituted N,N-dimethylbenzamide derivative gave separate proton NMR signals at low temperature. My question was how quickly restricted rotation about the amide C–N bond exchanged their environments—and whether the changing spectrum could tell us about the rotational energy barrier.',
    ],
    [
      scene(
        'exchange',
        'The same molecule can present two environments',
        [
          'Resonance gives an amide C–N bond partial double-bond character, so rotation is hindered. In a slowly exchanging conformation, the two N-methyl groups have different surroundings relative to the carbonyl group and can resonate at different frequencies.',
          'Rotation exchanges those environments. NMR distinguishes them when the exchange is slow relative to their frequency difference; fast exchange produces an averaged signal. “Slow” here is relative to this particular spectroscopic clock, not to how quickly a molecule moves through the solution.',
        ],
        'nmr-exchange',
        'A molecular marker switches slowly or quickly between two labeled environments.',
        'An abstract exchange sketch. The squares are environments, not a proposed bond-breaking mechanism.',
      ),
      scene(
        'coalescence',
        'Warm the sample and follow the whole line shape',
        [
          'I examined spectra between 263 and 333 K. The two low-temperature resonances broadened, merged near 323 K, and became a single narrower averaged line at the high-temperature end. Heating made the exchange faster without changing the molecular formula.',
          'I used the provided two-site NMR fitting function in Igor Pro to estimate exchange rates from the full line shapes. A useful check was the low-temperature frequency separation, about 73.4 Hz: the model should reproduce both the separated peaks and the region where they coalesce.',
          'Plotting ln(k) against 1/T then connected the fitted rates to an Arrhenius activation energy. My report obtained about 10 kcal/mol; the interesting result was that a visible spectral change could become a quantitative kinetic measurement.',
        ],
        'nmr-coalescence',
        'An equal-population two-site exchange spectrum evolves from two peaks toward one as the exchange rate increases.',
        'Calculated teaching spectra from a two-site exchange model; these are not digitized laboratory spectra.',
        {
          equations: [
            {
              label: 'The temperature dependence used in the analysis',
              expression: 'ln(k) = ln(A) − Ea / (RT)',
            },
          ],
          detailParagraphs: [
            'The reported activation energy was 10.24 kcal/mol. Its uncertainty calculation and rate convention should be checked before quoting a precise barrier or comparing tiny differences between compounds. Temperature-dependent chemical shifts can also alter the apparent peak separation.',
          ],
        },
      ),
      scene(
        'fitting',
        'Check what the fitting function is allowed to assume',
        [
          'I compared Gaussian and Lorentzian descriptions of the low-temperature peaks and tested how the exchange function behaved on simulated input. Two models can look very similar near a peak maximum while assigning different weight to the tails.',
          'This mattered because the fitted frequency-separation parameter drifted as temperature increased. I treated that as a reason to inspect the line-shape assumptions, rather than assume every returned parameter represented an independent physical change. The software was a tool for testing the molecular picture, not a substitute for one.',
        ],
        'nmr-lineshapes',
        'Gaussian and Lorentzian peaks agree near their centers but differ in their tails.',
        'Illustrative Gaussian and Lorentzian profiles, not alternative fitted results from this experiment. The lab work used the provided Igor NMR tools.',
      ),
    ],
  ),
  snippet(
    'spinach-fluorescence',
    [
      'I extracted chlorophyll from spinach to investigate how concentration affects its absorption and fluorescence. The central question became surprisingly practical: if I put more fluorescent material in the cuvette, why did the detector eventually stop reporting much more light?',
    ],
    [
      scene(
        'separate',
        'From spinach to a useful green fraction',
        [
          'After extraction and partitioning, I separated the pigment mixture on a column packed with a 50:50 mixture of celite and granulated grocery-store sugar. This packing allowed relatively fast elution and substantial sample loading. The visible bands made the separation easy to follow, but color alone was not enough to select a fraction.',
          'I checked the absorption spectra and retained fractions with a red maximum near 660 nm, characteristic of chlorophyll a. Fractions with additional features associated with chlorophyll b were less suitable for this measurement. I then prepared a concentration series from the selected material.',
        ],
        'spinach-separation',
        'A stylized leaf, chromatography column and separated colored sample tubes show the path from spinach to a fraction.',
        'An original overview of extraction and fraction collection, rather than a recording of the apparatus.',
      ),
      scene(
        'light',
        'Measure absorption as well as emission',
        [
          'I followed absorption near 662 nm and transmittance at the 436 nm excitation wavelength, alongside red fluorescence. Absorbance increased approximately linearly with concentration, while the fluorescence response bent toward a plateau.',
          'The optical reason is important: a concentrated sample absorbs much of the excitation close to the cuvette entrance. Adding molecules deeper in the cell does not help much if little excitation reaches them. Emitted light can also be reabsorbed before reaching the detector. These inner-filter effects change the measurement even without changing a molecule’s intrinsic fluorescence yield.',
          'I compared the fluorescence trend with a model incorporating excitation attenuation. Absorption supplied an independent clue about why the measured light was no longer proportional to concentration.',
        ],
        'chlorophyll-light',
        'Light penetrates farther into a dilute cuvette than into a more strongly absorbing one.',
        'A schematic optical comparison. It suggests effects worth checking; it does not uniquely diagnose the measured plateau.',
        {
          equations: [
            {
              label: 'Excitation transmission through an absorbing sample',
              expression: 'T = I / I₀ = 10^(−A)',
            },
          ],
        },
      ),
      scene(
        'plateau',
        'The plateau was real; its explanation needed more than one curve',
        [
          'The recorded signal rose from 168 units at 0.909 µM to 484 at 5.00 µM, but increasing concentration to 7.50 µM only raised it to 502. At the same time, excitation transmittance fell from 0.772 to 0.122. The added pigment was clearly changing how light traveled through the sample.',
          'This made inner-filter effects a useful interpretation to investigate. A plateau alone cannot separate excitation attenuation, reabsorption, instrumental range limits and other concentration effects. Measuring both the incoming-light loss and the outgoing fluorescence made the reasoning stronger than simply labeling the flattening curve “quenching”.',
          'I also investigated p-benzoquinone quenching at fixed chlorophyll concentration. That was a different question—how a second molecule changes emission—and a useful reminder to separate molecular photophysics from optical sampling.',
        ],
        'chlorophyll-readings',
        'Eight measured fluorescence points rise from 168 to about 500 units as concentration increases.',
        'Eight reported readings, at 0.909–7.5 µM, transcribed from page 5 of my report. No fitted mechanism is imposed on the points.',
        {
          detailParagraphs: [
            'The concentration series was 0.909, 1.25, 1.67, 2.50, 3.33, 5.00, 6.67 and 7.50 µM; fluorescence was 168, 222, 275, 366, 418, 484, 500 and 502 units.',
            'The benzoquinone mixtures used stocks with matched chlorophyll concentration so that adding quencher did not simultaneously dilute the fluorophore. Curvature in a steady-state Stern–Volmer plot alone does not uniquely separate static and dynamic quenching or establish a molecular distance.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'beyond-the-library-match',
    [
      'I used infrared spectroscopy to ask whether familiar solid samples could be identified from their vibrational fingerprints. Bringing known berberine and a formulated roxithromycin tablet into the comparison made it possible to test the library search against chemical context, rather than accept its first suggestion.',
    ],
    [
      scene(
        'clue',
        'Prepare a spectrum, then question the suggested name',
        [
          'Infrared absorption measures vibrational transitions. Functional groups contribute recognizable regions, while the crowded fingerprint region helps distinguish compounds with similar ingredients. I ground solid samples with KBr and pressed thin pellets so that infrared light could pass through them.',
          'The berberine sample’s leading library suggestion was 2,5-dimethoxyamphetamine, rather than berberine. That was a useful failure: a search can rank the closest entry available without that entry being the correct chemical identity.',
          'I compared the proposed structure with the expected functional groups and the whole spectral pattern. A library match score is a measure of similarity under a search procedure, not the probability that a sample has that identity.',
        ],
        'library-clues',
        'Two illustrative infrared traces share some peaks while differing in other diagnostically useful regions.',
        'Synthetic spectra illustrating partial resemblance. No commercial library spectrum or interface is reproduced.',
      ),
      scene(
        'mixture',
        'A tablet is not a pure active ingredient',
        [
          'The roxithromycin tablet gave a strong lactose-like match. A tablet contains excipients as well as its active ingredient, and the component producing the most prominent infrared features need not be the ingredient named on the medicine label.',
          'That observation changed the analytical question. To detect a weaker active ingredient reliably, I would need a suitable reference, diagnostic bands or a separation step. The bulk tablet spectrum could not by itself establish an active-ingredient concentration or a problem with the product.',
        ],
        'tablet-contributions',
        'An abstract tablet separates into several contributing components whose signals combine.',
        'A conceptual mixture sketch, without product-content claims or inferred ingredient quantities.',
      ),
      scene(
        'contact',
        'Choose a sampling method for the material',
        [
          'I also compared ways to sample solids and surfaces, including direct transmission and attenuated total reflectance (ATR). In ATR, infrared light reflects inside a crystal and an evanescent field probes the material in contact with its surface; good contact is part of obtaining a useful spectrum.',
          'Transmission through a pellet, a thin film in the beam, and ATR contact do not sample a material in identical ways. Matching the preparation to the sample—and understanding what part of it is being observed—was as important as selecting a promising library hit.',
        ],
        'ftir-sampling',
        'Different sample contact arrangements emphasize different material layers.',
        'An illustration of sampling sensitivity. The drawing is not a claim about leaching, safety, or a specific commercial material.',
      ),
    ],
  ),
  snippet(
    'five-dyes-one-spectrum',
    [
      'A universal indicator looks like one colored solution, but its spectrum is a mixture of several pH-sensitive dyes. I wanted to estimate their separate contributions: bromothymol blue, thymol blue, methyl orange, methyl red and phenolphthalein.',
    ],
    [
      scene(
        'combine',
        'Build the mixture from measured references',
        [
          'I measured individual dye spectra and checked concentration ranges where absorbance followed Beer–Lambert behavior. Under matched pH, solvent and path-length conditions, a mixture’s absorbance can be modeled as the sum of its component absorbances.',
          'I then fitted the mixture across many wavelengths as a weighted combination of the five references. This is a small linear-algebra problem: each reference spectrum is a column, and the unknown weights tell us how much of each reference is needed to reconstruct the observed shape. The stacked-color figure is a visual version of that calculation.',
        ],
        'dye-mixture',
        'Five component spectra combine into a single mixture spectrum.',
        'Synthetic component curves illustrate linear spectral unmixing; they are not the measured dye reference spectra.',
        {
          equations: [
            {
              label: 'A spectral mixture under matched reference conditions',
              expression: 'A(λ) ≈ Σᵢ wᵢ Aᵢ,reference(λ)',
            },
          ],
        },
      ),
      scene(
        'visibility',
        'pH decides which information is available',
        [
          'Changing pH changes each indicator’s chemical form and therefore its visible absorption. I compared acidic and basic measurements instead of treating one reference spectrum as universal.',
          'Phenolphthalein made the issue particularly clear: it is largely colorless in acidic solution. If its reference contributes almost no visible signal, the fit has little information about its amount. A mathematically available parameter is not necessarily a chemically observable quantity.',
          'The practical response was to look for conditions that made the components distinguishable, not simply ask the optimizer to work harder on an uninformative spectrum.',
        ],
        'dye-visibility',
        'One component fades from the visible response while the other colored contributions remain.',
        'A conceptual loss-of-visibility illustration. Acidic phenolphthalein is colorless; this is not a calibration of its speciation.',
      ),
      scene(
        'ambiguity',
        'A good total fit is only the first check',
        [
          'I inspected residuals and compared fitting ranges and uncertainty estimates. Two partially similar dye spectra can compensate for each other: one weight rises while another falls, with only a small change in the reconstructed total.',
          'That explains why a convincing overall curve does not automatically make every component amount precise. Agreement across suitable pH conditions and reasonable component behavior are stronger checks than a single small residual.',
          'The fitted weights describe contributions relative to the prepared references. They should not be read as percentages of the entire bottle consisting of dye rather than solvent.',
        ],
        'dye-tradeoffs',
        'Different component weights produce similar combined curves and small residuals.',
        'Synthetic fits show ambiguity rather than actual recovered concentrations. Matched pH and reference conditions are essential.',
        {
          detailParagraphs: [
            'For fixed references, the fit can be written y ≈ Xw and solved by least squares. Reference mismatch and correlated columns can dominate uncertainty even when there are many wavelength samples.',
            'If the residual scatter is itself used to define the observation uncertainty, a reduced χ² near one is not an independent demonstration that the chemical model is correct.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'ions-in-flight',
    [
      'I worked with a homebuilt vacuum-ultraviolet/time-of-flight instrument to connect molecular ionization with something directly observable: when ions reached a detector. The goals were to understand the mass spectrum, improve the timing conditions, and examine how an ion signal changed with photon energy.',
    ],
    [
      scene(
        'flight',
        'Turn a laser pulse into a mass-sensitive clock',
        [
          'A short VUV pulse ionized molecules in a molecular beam. Electric fields accelerated the ions, and their arrival times were recorded after a flight region. For a fixed accelerating voltage, ions with the same charge receive the same kinetic energy, so heavier ions travel more slowly.',
          'That supplies the link between arrival time and mass-to-charge ratio. I used the recorded timing peaks to interpret the ion signals; the homebuilt apparatus itself was provided, rather than something I designed or constructed.',
        ],
        'ion-flight',
        'Illustrative ions with different masses travel through a flight region and arrive at different times.',
        'A simplified flight model. Under the stated equal-charge conditions, flight time scales with the square root of mass.',
        {
          equations: [
            {
              label:
                'Ideal equal-voltage acceleration followed by field-free flight',
              expression: 'qV = ½mv²     →     t ∝ √(m/q)',
            },
          ],
        },
      ),
      scene(
        'focus',
        'Make the time depend less on where an ion started',
        [
          'An ion packet occupies a finite region. Even ions of the same species can start at slightly different positions or with different velocities, broadening the arrival-time peak.',
          'I examined source and timing conditions with that spread in mind. Acceleration stages can compensate for some starting-position differences, bringing same-mass arrivals closer together in time. A sharper peak makes neighboring signals easier to distinguish; it does not require changing the molecules.',
        ],
        'ion-focusing',
        'A broad range of illustrative ion paths is compared with an arrangement that brings arrivals closer together.',
        'A conceptual focusing sketch, not a ray-traced reconstruction of the course apparatus.',
      ),
      scene(
        'threshold',
        'Use photon energy as another experimental variable',
        [
          'I also followed an ionization onset while scanning the laser settings. Below a suitable energy, a particular ion channel is inaccessible; above it, the signal can appear and grow. This connects a spectral signal to a molecular energy requirement.',
          'Extracting an ionization energy requires a calibrated conversion from the laser setting to photon energy and a defensible definition of the onset. I keep this snippet focused on the measurement principle, because the numerical energy conversions in my original analysis need rechecking before I would present a precise threshold.',
        ],
        'ion-threshold',
        'An illustrative ion signal appears as photon energy crosses a threshold.',
        'Synthetic onset curves; no numerical threshold or lifetime is claimed from this animation.',
      ),
    ],
  ),
  snippet(
    'a-reaction-in-fading-color',
    [
      'I followed acid-catalyzed ketone bromination with visible absorption spectroscopy. The aim was to determine which concentrations controlled the rate and use that behavior to investigate the mechanism—not simply time how long a yellow solution took to become clear.',
    ],
    [
      scene(
        'crossing',
        'Choose a wavelength that follows the chemistry you want',
        [
          'The colored solution contains an equilibrium between Br₂ and Br₃⁻. Their absorption spectra differ, so a changing reading at an arbitrary wavelength could reflect changing speciation as well as bromine consumption.',
          'I found spectral crossings near 426 and 444 nm, where the two forms had matching absorptivities. Monitoring at an isosbestic wavelength made the response less sensitive to redistribution between them and more useful for following their combined concentration. This was an instrumental choice made to simplify the kinetic question.',
        ],
        'reaction-crossing',
        'Two synthetic absorption spectra cross at a highlighted wavelength with equal response.',
        'Illustrative crossing at 440 nm. The report used crossings near 426 and 444 nm; the animation is not a measured spectrum.',
      ),
      scene(
        'clock',
        'Change one concentration, compare the initial slopes',
        [
          'With cyclopentanone and acid in excess, the bromine absorbance decreased almost linearly over the useful observation interval. I converted those slopes into rates and compared runs with changed ketone and acid concentrations.',
          'The results were approximately first order in ketone and H⁺, but zero order in bromine under these conditions. That is a clue that bromine capture is faster than the slower process supplying the reactive ketone-derived intermediate. The measured rate law belongs to these conditions, rather than to every possible bromination mixture.',
        ],
        'reaction-clock',
        'A colored sample fades alongside an illustrative time trace and fitted slope.',
        'Synthetic progress curves illustrate a rate comparison, not reconstructed kinetic data.',
        {
          equations: [
            {
              label:
                'Approximate rate behavior in the measured excess-ketone/acid regime',
              expression:
                'rate ≈ k[ketone][H⁺]     (approximately independent of [Br₂])',
            },
          ],
        },
      ),
      scene(
        'isotope',
        'Ask whether breaking a C–H bond matters to the slow step',
        [
          'In a separate acetone experiment, I compared acetone with acetone-d₆. The reported rate ratio, kH/kD ≈ 7.9, was a substantial primary kinetic isotope effect: replacing hydrogen with deuterium changed the pace of the reaction.',
          'Taken together with the concentration dependence, this supported slow acid-catalyzed enol formation followed by faster reaction with bromine. It is stronger reasoning than treating either one rate law or one isotope effect as a complete proof of every mechanistic step.',
          'Keeping the two experiments distinct matters: the concentration-order series used cyclopentanone, while the hydrogen/deuterium comparison used acetone.',
        ],
        'reaction-isotopes',
        'Hydrogen and deuterium labels accompany reaction traces that decay at different illustrative rates.',
        'A qualitative kinetic isotope effect. This acetone comparison is distinct from the cyclopentanone initial-rate series.',
      ),
    ],
  ),
  snippet(
    'heat-by-a-different-route',
    [
      'I wanted to estimate the heat of converting methyl methacrylate into poly(methyl methacrylate), PMMA. Rather than measure polymerization directly, I compared combustion of the monomer and polymer: two routes to the same final products.',
    ],
    [
      scene(
        'cycle',
        'Use a thermochemical cycle to ask an indirect question',
        [
          'Enthalpy is a state function. If a mole of monomer units and the corresponding amount of polymer repeat units are completely combusted to matching products, their combustion-enthalpy difference connects the two starting states.',
          'The comparison has to use the same chemical accounting—especially the amount expressed per monomer or repeat unit. Otherwise a numerical difference can look meaningful while comparing different quantities.',
        ],
        'heat-cycle',
        'Two schematic starting states connect through combustion paths to a common set of products.',
        'A conceptual Hess cycle. Drawing height does not encode measured energy, and no reported heat value is reproduced.',
        {
          equations: [
            {
              label:
                'Hess’s law, with polymer combustion expressed per repeat unit',
              expression: 'ΔHpolymerization = ΔcHmonomer − ΔcHpolymer',
            },
          ],
        },
      ),
      scene(
        'trace',
        'First learn how the calorimeter responds',
        [
          'I calibrated the bomb calorimeter with benzoic acid, then measured combustion temperature rises for monomer and polymer samples. The rises were on the order of 2 °C. Corrections for fuse-wire combustion, acid formation and thermal drift were part of turning that temperature record into a sample-combustion energy.',
          'The sealed bomb measurement is a constant-volume measurement, so it gives an internal-energy change. Converting to reaction enthalpy requires the gas-mole correction, ΔH = ΔU + ΔngasRT. The route from a thermometer to an enthalpy is therefore a sequence of physical assumptions and corrections, not one multiplication.',
        ],
        'heat-trace',
        'An illustrative calorimeter trace rises above a drifting baseline.',
        'Synthetic temperature data, not a recovered experimental trace.',
      ),
      scene(
        'difference',
        'The desired heat was smaller than the two measurements',
        [
          'The polymerization estimate came from subtracting two much larger combustion values. Scatter between runs and the shared calorimeter calibration therefore mattered strongly to the final difference.',
          'My original numerical summary contains a sign inconsistency and a large uncertainty, so I do not present it here as a precise successful determination. The conventional sign is clear: an exothermic polymerization has negative ΔH. Rechecking that bookkeeping would come before attaching a reliable value to this dataset.',
          'The useful result of the exercise was understanding how an indirect thermodynamic measurement can be elegant in principle and demanding in practice.',
        ],
        'heat-difference',
        'Two large illustrative energy measurements and their much smaller difference are compared.',
        'Illustrative magnitudes only. The report’s sign and uncertainty bookkeeping would need rechecking before quoting a numerical result.',
        {
          detailParagraphs: [
            'A calibration parameter shared by both measurements creates correlated uncertainty. For a difference X − Y, Var(X − Y) = Var(X) + Var(Y) − 2Cov(X,Y). Treating the shared calibration as two independent errors can misstate the uncertainty.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'isotopes-in-the-infrared',
    [
      'I used a sequence of infrared analyses—DCl, methane, and a supplied CD₃H spectrum—to connect line positions with molecular motion. The goal was to move beyond recognizing a functional group and extract information about masses, rotation and bond behavior.',
    ],
    [
      scene(
        'mass',
        'Change the mass without rebuilding the bond',
        [
          'In a simple harmonic picture, a vibrational frequency depends on the bond’s effective force constant and the reduced mass of the moving atoms. Replacing hydrogen with deuterium changes the mass much more than the underlying electronic bonding, so the vibrational frequency shifts downward.',
          'This makes isotopes useful for checking an assignment. If I think a spectral feature involves a particular bond, its isotope shift should be consistent with which atoms are moving. The harmonic model provides a starting expectation; real spectra include anharmonicity and coupling.',
        ],
        'ir-isotopes',
        'Two schematic bond oscillators with different masses are shown beside shifted infrared features.',
        'A qualitative harmonic-oscillator comparison inspired by HCl/DCl; the motion is not a fitted trajectory.',
        {
          equations: [
            {
              label: 'The harmonic starting point',
              expression: 'ν ∝ √(kforce / μ)     with     μ = m₁m₂ / (m₁ + m₂)',
            },
          ],
        },
      ),
      scene(
        'population',
        'A band is a family of transitions',
        [
          'Vibration and rotation occur together. An infrared band can therefore contain many lines corresponding to different rotational changes, with intensities influenced by the populations of the starting states.',
          'I used rotational-envelope simulations to see how temperature redistributes those populations. This helped distinguish a change in the envelope from a shift in the underlying vibrational band origin. It also explained why fitting only the most intense line can miss much of the molecular information.',
        ],
        'ir-populations',
        'A calculated rotational population envelope shifts among angular-momentum states as illustrative temperature changes.',
        'A rigid-rotor Boltzmann teaching model, rather than measured line intensities.',
      ),
      scene(
        'assignment',
        'Make the line assignments agree with each other',
        [
          'For methane, I analyzed stretching and bending regions, used automated peak picking, and manually corrected the selected peaks. I tested starting rotational assignments with a Python script rather than assume the first visible peak was necessarily the first allowed transition. Including rotational–vibrational coupling changed the inferred constants.',
          'The supplied CD₃H digital spectrum added another useful complication: its relatively isolated C–H stretch resembled a local-mode oscillator, but some rotational lines were shifted or missing. I compared the remaining P- and R-branch patterns to identify a consistent set for fitting.',
          'The lesson was to ask one model to explain a family of lines, their isotope behavior and their exceptions. These analyses combine simulations and supplied spectra with laboratory measurements; I did not acquire every source spectrum myself.',
        ],
        'ir-assignments',
        'An illustrative comb of spectral lines is linked to transition assignments.',
        'Synthetic line positions. Some source spectra were supplied course data; this page does not claim that I acquired all of them.',
        {
          detailParagraphs: [
            'A simple branch fit uses ν̃(m) = ν̃₀ + (B₁ + B₀)m + (B₁ − B₀)m², where m = −J″ for a P-branch transition and m = J″ + 1 for an R-branch transition. Additional coupling and perturbations determine when this approximation is adequate.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'the-empty-cell-spectrum',
    [
      'I was using infrared spectra to characterize liquid samples and estimate transmission-cell path lengths. Before interpreting any liquid, I found that an empty cell already produced repeating structure. That background was also a record of light taking more than one path.',
    ],
    [
      scene(
        'paths',
        'An empty cell can still create an optical signal',
        [
          'Part of the infrared beam reflects at the cell windows. Contributions that travel different optical distances can recombine and interfere, leaving fringes in the spectrum and displaced echo-like features in the interferogram.',
          'I examined empty KBr and ZnSe cells before treating their backgrounds as something to subtract. The ZnSe interferogram showed two side ghost peaks around the central burst; comparable ghosts were not resolved in the KBr record. The informative quantity was the separation between a ghost and the center, not just the ghost’s height.',
        ],
        'empty-cell-paths',
        'Light passes between two windows while a reflected path travels farther before recombining.',
        'A simplified multiple-path sketch. Geometrical travel and optical path difference are not interchangeable.',
      ),
      scene(
        'fringes',
        'Compare two ways of measuring an optical distance',
        [
          'I estimated the path length from center-to-ghost separations and separately from fringe spacing in the wavenumber spectrum. For a simple parallel-gap model at near-normal incidence, the optical thickness is related to how many complete fringes fit in a selected wavenumber interval.',
          'The two routes did not provide a reason to ignore the coordinate conventions. My interferogram was plotted against mirror displacement; in a Michelson interferometer, moving a mirror changes the optical path difference by twice that displacement. Cell reflections introduce their own optical-distance relation as well.',
          'Before quoting a cell thickness, those factors, refractive indices and cm/mm conversions need to agree. The disagreement made checking what the horizontal axis actually represented part of the experiment.',
        ],
        'empty-cell-fringes',
        'A synthetic periodic infrared fringe pattern changes as illustrative optical thickness changes.',
        'Teaching fringes, not a reproduced cell measurement or a claimed path-length determination.',
        {
          equations: [
            {
              label:
                'Idealized near-normal fringe counting over a wavenumber interval',
              expression: 'nL ≈ m / (2Δν̃)',
            },
          ],
          detailParagraphs: [
            'Here m counts complete oscillations and Δν̃ is expressed in reciprocal-length units compatible with L. The relevant refractive index belongs to the interfering optical region. This simplified expression is not a conversion rule for every window/cell geometry.',
          ],
        },
      ),
      scene(
        'residual',
        'Use what remains after subtraction',
        [
          'The same measurements led into a xylene-mixture analysis. I adjusted trial component contributions and looked at the structured signal left over after subtraction: a remaining peak suggested which part of the guessed composition was still wrong.',
          'This was useful as a convergence check. Small differences between successive guesses showed that the adjustment was settling, but were not automatically the experimental uncertainty of the final composition. The residual had to be interpreted in terms of the chemical and optical model that produced it.',
        ],
        'mixture-residual',
        'A changing guessed component leaves a structured residual that becomes smaller near a better match.',
        'Synthetic spectra illustrate residual inspection; they do not reconstruct the experiment’s mixture composition.',
      ),
    ],
  ),
  snippet(
    'sweeping-the-voltage',
    [
      'I used cyclic voltammetry first to understand a familiar redox couple, then to investigate acetaminophen in a liquid medicine. The goal was to connect the shape and size of an electrical response to chemical behavior and, with calibration, to concentration.',
    ],
    [
      scene(
        'sweep',
        'A controlled potential asks the molecule a question',
        [
          'A potentiostat changes the working-electrode potential relative to a reference electrode and measures current. If oxidation or reduction becomes favorable, electron transfer contributes to that current. Sweeping back asks what can react in the reverse direction.',
          'I began with the ferricyanide/ferrocyanide couple, Fe(CN)₆³⁻/Fe(CN)₆⁴⁻, using screen-printed electrodes with a carbon working electrode and Ag/AgCl reference. The forward and return peaks gave a concrete introduction to how a reversible-looking response differs from a signal that does not return cleanly.',
        ],
        'cv-sweep',
        'A potential scan moves forward and backward while an illustrative current–potential loop is traced.',
        'A schematic voltammogram. Potentials are relative teaching coordinates, not values versus a specified experimental reference electrode.',
      ),
      scene(
        'speed',
        'Scan rate separates an amount from a timescale',
        [
          'I changed the scan rate and compared the peak currents. For an ideal reversible, diffusion-controlled process, faster scanning increases the peak current approximately with the square root of scan rate, because the diffusion layer has had less time to extend into solution.',
          'That gives a useful diagnostic plot, ip against √v. It is not a universal concentration law: electrode area, diffusion, electron-transfer behavior and the solution conditions still matter. I used the comparison to understand the measurement before applying it to a less simple sample.',
        ],
        'cv-speed',
        'Illustrative voltammograms grow as the scan rate increases.',
        'A simplified diffusion-controlled comparison, not proof that every measured redox process was reversible.',
        {
          equations: [
            {
              label:
                'A diagnostic scaling for a reversible diffusion-controlled response',
              expression:
                'ip ∝ c√v     (with the other experimental conditions fixed)',
            },
          ],
        },
      ),
      scene(
        'solution',
        'Use pH and calibration deliberately',
        [
          'Acetaminophen’s response changed with pH, which alters the coupled proton/electron chemistry. I examined buffered conditions, then prepared standards and related peak current to acetaminophen concentration for the quantitative part.',
          'The medicine sample had to be diluted into the useful measurement range and compared under compatible conditions. This is why preparing a standard curve, choosing the background and maintaining electrode behavior are part of the chemistry, rather than bookkeeping after it.',
          'The calculation produced a concentration estimate, but I would not turn a disagreement with a product label into a medicine-quality conclusion without resolving the calibration and uncertainty. The more general result was a working connection between molecular redox behavior and an analytical signal.',
        ],
        'cv-solution',
        'A sample environment changes beside an illustrative electrochemical response.',
        'A conceptual pH and response sketch, without conclusions about medicine quality or manufacturing.',
      ),
    ],
  ),
  snippet(
    'a-mixture-over-one-hundred-percent',
    [
      'I used gas chromatography to investigate a commercial paint-stripping after-wash mixture. The questions were what solvents were present and how much of each the sample contained. The separation looked useful; the calculated composition eventually failed a basic chemical check.',
    ],
    [
      scene(
        'separate',
        'Identify peaks before interpreting their areas',
        [
          'I compared the mixture on two columns and injected solvent standards, including methanol, acetone and the xylene isomers. Retention times helped associate the mixture peaks with candidate components, while the different columns showed how separation depends on the stationary phase.',
          'A peak area is a detector response, not automatically a mass percentage. To estimate amounts, I added known solvent mixtures and followed the changes in peak responses. Overlapping xylene peaks and run-to-run injection variation made those comparisons more demanding than simply reading a chromatogram.',
        ],
        'gc-separation',
        'Several synthetic chromatographic peaks emerge at distinct retention times.',
        'Synthetic peaks illustrate separation; these are not reconstructed chromatograms.',
      ),
      scene(
        'total',
        'Check the answer against the sample',
        [
          'Three reported estimates were 26.10%, 61.92% and 25.91%, already totaling 113.93%. Another calculation even returned a negative component amount. Those numbers could not be accepted as a physical composition.',
          'This was a useful point to separate a successful separation from a successful quantification. Calibration, addition-volume accounting, peak integration and response factors all sit between an attractive trace and a mass balance. The impossible total was evidence to revisit that chain, rather than normalize the numbers until they looked plausible.',
        ],
        'gc-total',
        'Bars labeled with the three reported percentages sum to 113.93%, beyond the 100% reference.',
        'The three percentages are reported values; the animated bars are an explanatory reconstruction, not validated composition measurements.',
      ),
      scene(
        'ratio',
        'Work out exactly what normalization cancels',
        [
          'I used peak-area ratios to reduce sensitivity to injection size. If both component signals share the same multiplicative injection factor, their ratio cancels it. But the concentrations in the vial, detector response factors and any unresolved peak contributions still have to be modeled correctly.',
          'My original discussion blamed the use of a component already present in the sample as the reference. That alone is not sufficient: a native reference can work if its amount and the additions are accounted for consistently. The dataset identifies a problem, but does not establish a unique cause.',
          'The lesson I kept was to make the algebra answer to the chemical preparation. A ratio is useful because particular factors cancel—not because it makes every uncertainty disappear.',
        ],
        'gc-ratios',
        'A common scale change affects two signals together while their ratio stays fixed.',
        'An illustrative ratio model. Native presence of a standard does not, by itself, invalidate ratio-based quantitation.',
        {
          equations: [
            {
              label:
                'A shared injection-size factor cancels, while chemical factors remain',
              expression: 'areaA / areaB = (responseA × cA) / (responseB × cB)',
            },
          ],
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
  snippet(
    'tea-and-an-unexpected-answer',
    [
      'I tried to determine caffeine and theophylline in tea using ultraviolet absorption. Their spectra overlap strongly, so I combined spectroscopy with extraction: change their relative amounts in a controlled way, then use the before-and-after readings to separate the contributions.',
    ],
    [
      scene(
        'overlap',
        'One absorbance can contain two answers',
        [
          'I first measured concentration series of caffeine and theophylline standards and fitted their absorption responses in Python. Beer–Lambert’s law relates absorbance to molar absorptivity, path length and concentration.',
          'For a two-component mixture, the measured absorbance is the sum of the two contributions. If their spectra are very similar, simply collecting a large absorbance signal does not make the two unknown concentrations easy to distinguish. I needed another measurement that changed the balance between them.',
        ],
        'tea-overlap',
        'Two similar ultraviolet profiles overlap strongly, making their combined signal difficult to separate.',
        'Synthetic spectra illustrate overlap; they are not measured tea spectra.',
        {
          equations: [
            {
              label: 'The mixture model at a selected wavelength',
              expression:
                'A = l(εcaffeine ccaffeine + εtheophylline ctheophylline)',
            },
          ],
        },
      ),
      scene(
        'recovery',
        'Use extraction to create a second view',
        [
          'I extracted the standards with ethyl acetate to estimate how much of each compound remained in the aqueous phase. I then compared tea absorbance before and after extraction. The residual fractions entered a second equation, because the two compounds did not partition in exactly the same way.',
          'The reported aqueous fractions were about 0.58 and 0.68. That difference supplies information, but is modest: the before-and-after equations are still fairly similar. Small errors in absorbance, extraction recovery or background can therefore have a large effect on the separated concentrations.',
        ],
        'tea-extraction',
        'A schematic two-phase extraction transfers part of a dissolved component into a second phase.',
        'A conceptual recovery illustration, not a solvent-handling procedure or an exact reconstruction of the glassware.',
        {
          detailParagraphs: [
            'Writing the two unknown optical contributions as u and v gives A_before = u + v and A_after = f₁u + f₂v. Solving involves f₂ − f₁ in the denominator. When the residual fractions are close, uncertainty is amplified. This is the experimental counterpart of an ill-conditioned linear system.',
          ],
        },
      ),
      scene(
        'unexpected',
        'A negative concentration tells us to inspect the model',
        [
          'Some fitted amounts were negative. That does not describe negative caffeine inside the tea; it means the measured signals and the assumed two-component model did not combine into a physically credible estimate.',
          'I checked the spectral overlap and extraction assumptions, and noted visible mold in one tea sample as a possible additional complication. That observation did not prove the cause of the discrepancy: other UV-absorbing tea components and ordinary measurement errors also matter.',
          'The useful outcome was recognizing where the information was weak. A more selective measurement, better-separated extraction behavior, or a stronger treatment of the sample background would be more valuable than reporting extra decimal places from the same unstable calculation.',
        ],
        'tea-estimates',
        'Noisy illustrative observations produce a spread of component estimates, including some below zero.',
        'Synthetic estimates demonstrate instability. They are not nutritional measurements or evidence for one specific cause of the original discrepancy.',
      ),
    ],
  ),
  snippet(
    'a-half-life-in-noisy-counts',
    [
      'I investigated radioactive counting statistics and used a decaying source to identify a short-lived nuclide. Two measurements asked different questions: the count-rate curve described how quickly the source changed, while a gamma spectrum described the energy deposited by its radiation.',
    ],
    [
      scene(
        'counts',
        'Start with the uncertainty in the clicks',
        [
          'I collected repeated counting intervals at low and higher average rates. Individual readings varied even when the source and geometry were unchanged. For independent events at a steady rate, a Poisson model predicts a standard deviation of roughly √N for N counts.',
          'That explains an important tradeoff: more counts have larger absolute fluctuations but smaller relative fluctuations, about 1/√N. The repeated histograms were a check on whether the observed spread behaved like counting statistics, before interpreting small differences as chemistry or instrument drift.',
        ],
        'count-distributions',
        'Poisson probability bars compare a low expected count with a higher expected count.',
        'Calculated Poisson distributions, not detector measurements. Zero counts are a possible outcome.',
        {
          equations: [
            {
              label: 'Approximate Poisson counting uncertainty',
              expression: 'σN ≈ √N     and     relative uncertainty ≈ 1/√N',
            },
          ],
        },
      ),
      scene(
        'decay',
        'Fit a decay constant, then calculate the half-life',
        [
          'The unknown was eluted from a radionuclide generator and followed over time. After allowing for background and the usable decay interval, an exponential model relates the count rate to the surviving radioactive population.',
          'My original decay file was not saved. With permission, I analyzed a replacement dataset recorded by Stephanie Chen from the same generator, and I keep that contribution explicit. The fit in my report gave a half-life of 2.56 ± 0.05 minutes, consistent with metastable barium-137.',
          'The curve here is a teaching illustration; it does not republish that shared dataset.',
        ],
        'count-decay',
        'An exponential decay is compared with a decay containing a constant background.',
        'Synthetic decay curves. For the original report, a lost decay file was replaced with data shared by Stephanie Chen with TA approval; none of that shared dataset is reproduced here.',
        {
          equations: [
            {
              label: 'A decay model with an instrumental background',
              expression: 'R(t) = R₀ exp(−λt) + B     →     t½ = ln(2) / λ',
            },
          ],
        },
      ),
      scene(
        'window',
        'Choose the fitting region for a physical reason',
        [
          'The full recorded trace included early behavior that did not follow a single clean decay. I examined the post-peak region instead of treating an arbitrary truncation as an innocuous plotting choice.',
          'At late times, background becomes a larger fraction of the reading. At early times, collection, transfer or instrument settling can complicate the trace. The selected interval should be justified by the source behavior and residuals; choosing the interval that happens to give the preferred half-life would not be an independent check.',
        ],
        'count-window',
        'An illustrative count trace with an early transient is inspected over a highlighted fitting interval.',
        'Synthetic time data. The highlighted interval demonstrates a question to investigate, not a prescribed universal cutoff.',
      ),
      scene(
        'gamma',
        'An energy spectrum is not a row of random clicks',
        [
          'A gamma spectrometer sorts pulses by their heights, which are related to deposited energy. Full-energy absorption produces a photopeak; scattering can deposit only part of the photon’s energy and populate a continuum. This is why the spectrum contains both peaks and broader structure.',
          'The report’s spectrum contained a high-channel photopeak associated with the familiar approximately 662 keV transition. Together with the short half-life and generator context, it supported the barium-137m interpretation.',
          'I used that assigned line to set the energy scale. Consequently, agreement at 662 keV is a calibration anchor, not an independent zero-error confirmation of the identity. The lower-energy features also deserve more careful interpretation than my original summary gave them.',
        ],
        'gamma-energy',
        'An illustrative gamma spectrum with a full-energy photopeak and continuum sits beside pulses of different heights.',
        'Illustrative gamma response: a photopeak near 662 keV, lower-energy structure, and a Compton continuum. This is not a transcription of the measured spectrum.',
        {
          sources: [
            {
              label: 'Brookhaven NNDC: evaluated barium-137 decay data',
              href: 'https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=137cs+bM+decay&nucleus=137BA',
            },
          ],
          detailParagraphs: [
            'The evaluated barium-137m half-life is approximately 2.552 minutes. The reported 2.56 ± 0.05 minute result came from analysis of Stephanie Chen’s shared decay file.',
            'For 662 keV photons, the ideal maximum energy transferred to an electron in a single Compton scatter is about 478 keV. A feature near 180 keV should not be labeled that Compton edge; backscattered photons have a different energy relation. The original report’s lower-energy assignments and one-point calibration do not establish exact identities for all those features.',
          ],
        },
      ),
    ],
  ),
  snippet(
    'four-unknowns',
    [
      'I had four unknowns to investigate: a powder, a polymer film, a colored solution and a fluorescent solution. The goal was not one universal test. I needed to choose which evidence could identify a material and which calibration could establish an amount.',
    ],
    [
      scene(
        'question',
        'Ask an identity question of the solids',
        [
          'I prepared the powder for infrared transmission in a KBr pellet and examined its characteristic functional-group regions alongside a library comparison. The combined pattern supported ascorbic acid, including broad hydroxyl absorption and the lactone carbonyl region.',
          'The film required a different practical choice. When the ATR instrument failed to give reasonable spectra, I measured the thin film directly in transmission. Its spectrum supported a polyethylene-like material, but the evidence for a specific density/branching subtype was less secure than a confident library name might imply.',
          'That distinction matters: identifying a broad polymer family is not the same as proving an exact commercial grade.',
        ],
        'unknown-samples',
        'Four stylized sample tubes lead to separate questions about identity and quantity.',
        'An original summary illustration, not photographs of the submitted unknown samples.',
      ),
      scene(
        'shape',
        'Ask a concentration question of the solutions',
        [
          'For the colored unknown, I used UV–visible standards and compared its absorption with a calibration. For the fluorescent unknown, I established an intensity–concentration relation and measured the diluted sample in a useful response range. These were different optical measurements, even though both began with solutions in cuvettes.',
          'I checked the spectral shape across wavelengths rather than rely on one attractive point. If different parts of the spectrum implied incompatible amounts, that would suggest an interference, baseline problem or mismatched standard.',
          'More wavelength samples improve the shape check, but adjacent wavelengths are correlated. They are not a substitute for independently prepared replicates.',
        ],
        'unknown-wavelengths',
        'Multiple highlighted wavelengths sample an illustrative absorption profile.',
        'Synthetic spectral checks; no unknown concentrations are reconstructed.',
      ),
      scene(
        'judgment',
        'Keep the chain from observation to conclusion visible',
        [
          'A calibration line, y = a + bc, gives c = (y − a)/b only after the blank, dilution factor, units and response conditions are consistent. I compared calibration choices and propagated their uncertainties instead of treating the fitted slope as exact.',
          'The practical result was a set of conclusions with different strengths: a stronger powder identification, a broader polymer identification, and concentration estimates whose reliability depended on the chosen calibration. Averaging two disagreeing calibrations would not automatically remove a shared bias.',
          'This is the part of analytical work I find satisfying: explain what was measured, why that measurement was appropriate, and how far it allows the chemical conclusion to go.',
        ],
        'unknown-calibration',
        'Two illustrative calibration lines map the same measured response to different inferred concentrations.',
        'A teaching comparison. Averaging inconsistent calibrations does not automatically remove a common systematic error.',
        {
          equations: [
            {
              label:
                'Invert a linear calibration, then restore the preparation dilution',
              expression:
                'csample = dilution factor × (signal − intercept) / slope',
            },
          ],
        },
      ),
    ],
  ),
]
