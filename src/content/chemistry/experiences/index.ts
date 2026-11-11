// Lightweight collection metadata; article bodies are loaded with the detail route.
export const chemistryExperienceCards: {
  slug: string
  title: string
  summary: string
  course: 'CHEM 3020' | 'CHEM 3030'
  preview: string
  previewGif: string
  previewAlt: string
}[] = [
  {
    slug: 'tonic-water-fluorescence',
    title: 'Tonic water and a stubborn fluorimeter',
    summary:
      'A glowing drink, a troublesome measurement, and a reason to rethink the model.',
    course: 'CHEM 3020',
    preview:
      '/media/chemistry/experiences/tonic-water-fluorescence-preview.png',
    previewGif:
      '/media/chemistry/experiences/tonic-water-fluorescence-preview.gif',
    previewAlt:
      'A tonic bottle beside a blue-fluorescing test tube; three spoonfuls of salt gradually extinguish the glow.',
  },
  {
    slug: 'two-peaks-become-one',
    title: 'Watching two NMR peaks become one',
    summary:
      'A molecule keeps moving. The spectrum changes when our observational timescale catches up.',
    course: 'CHEM 3030',
    preview: '/media/chemistry/experiences/two-peaks-become-one-preview.png',
    previewGif: '/media/chemistry/experiences/two-peaks-become-one-preview.gif',
    previewAlt:
      'Two NMR peaks broaden and merge while a thermometer rises beside the spectral display.',
  },
  {
    slug: 'spinach-fluorescence',
    title: 'Spinach under a different light',
    summary:
      'Separating green pigments reveals a bright signal—and the point where more stops looking brighter.',
    course: 'CHEM 3030',
    preview: '/media/chemistry/experiences/spinach-fluorescence-preview.png',
    previewGif: '/media/chemistry/experiences/spinach-fluorescence-preview.gif',
    previewAlt:
      'A gently moving spinach leaf beside a cuvette; light penetrates less deeply as its green solution becomes concentrated.',
  },
  {
    slug: 'beyond-the-library-match',
    title: 'When the spectral library suggests the wrong compound',
    summary:
      'An infrared search result is a lead to investigate, rather than an identification to accept.',
    course: 'CHEM 3020',
    preview:
      '/media/chemistry/experiences/beyond-the-library-match-preview.png',
    previewGif:
      '/media/chemistry/experiences/beyond-the-library-match-preview.gif',
    previewAlt:
      'KBr and sample are ground, pressed with a socket wrench and mini-press, then examined in an infrared beam.',
  },
  {
    slug: 'five-dyes-one-spectrum',
    title: 'Five dyes in one color',
    summary:
      'Can a crowded spectrum tell us how much of each colored ingredient is present?',
    course: 'CHEM 3020',
    preview: '/media/chemistry/experiences/five-dyes-one-spectrum-preview.png',
    previewGif:
      '/media/chemistry/experiences/five-dyes-one-spectrum-preview.gif',
    previewAlt:
      'Five colored spectral contributions build into a stacked spectrum and a shared outline.',
  },
  {
    slug: 'ions-in-flight',
    title: 'A molecule’s flight time',
    summary:
      'A small instrument turns arrival times into clues about mass and ionization.',
    course: 'CHEM 3030',
    preview: '/media/chemistry/experiences/ions-in-flight-preview.png',
    previewGif: '/media/chemistry/experiences/ions-in-flight-preview.gif',
    previewAlt:
      'A laser pulse starts three illustrative ions, which fly at different speeds toward a detector.',
  },
  {
    slug: 'a-reaction-in-fading-color',
    title: 'Following a reaction as its color fades',
    summary:
      'Choose where to look, then let a changing color become a reaction clock.',
    course: 'CHEM 3030',
    preview:
      '/media/chemistry/experiences/a-reaction-in-fading-color-preview.png',
    previewGif:
      '/media/chemistry/experiences/a-reaction-in-fading-color-preview.gif',
    previewAlt:
      'Three stirred reaction vials lose their yellow color at different rates until all are clear.',
  },
  {
    slug: 'heat-by-a-different-route',
    title: 'Two combustions and a missing heat',
    summary:
      'Sometimes the quantity we want is hidden in the difference between two easier measurements.',
    course: 'CHEM 3030',
    preview:
      '/media/chemistry/experiences/heat-by-a-different-route-preview.png',
    previewGif:
      '/media/chemistry/experiences/heat-by-a-different-route-preview.gif',
    previewAlt:
      'Two cutaway bomb calorimeters compare separate and connected molecular units, combustion, and different thermometer rises.',
  },
  {
    slug: 'isotopes-in-the-infrared',
    title: 'Changing an atom, shifting a spectrum',
    summary:
      'Molecular motion leaves a fingerprint that changes when an isotope changes the mass.',
    course: 'CHEM 3030',
    preview:
      '/media/chemistry/experiences/isotopes-in-the-infrared-preview.png',
    previewGif:
      '/media/chemistry/experiences/isotopes-in-the-infrared-preview.gif',
    previewAlt:
      'Methane molecules illustrate symmetric stretching, asymmetric stretching, and bending.',
  },
  {
    slug: 'the-empty-cell-spectrum',
    title: 'The empty cell had a spectrum',
    summary:
      'An unexpected pattern turned an apparent background into something worth investigating.',
    course: 'CHEM 3020',
    preview: '/media/chemistry/experiences/the-empty-cell-spectrum-preview.png',
    previewGif:
      '/media/chemistry/experiences/the-empty-cell-spectrum-preview.gif',
    previewAlt:
      'An interferogram reveals a side ghost peak; a distance marker grows and a magnified view opens.',
  },
  {
    slug: 'sweeping-the-voltage',
    title: 'Sweeping the voltage, watching the chemistry',
    summary:
      'An electrode turns a changing electrical push into a record of chemical response.',
    course: 'CHEM 3020',
    preview: '/media/chemistry/experiences/sweeping-the-voltage-preview.png',
    previewGif: '/media/chemistry/experiences/sweeping-the-voltage-preview.gif',
    previewAlt:
      'A cyclic voltammogram is traced forward and backward into its characteristic loop.',
  },
  {
    slug: 'a-mixture-over-one-hundred-percent',
    title: 'A mixture that added up to more than 100 percent',
    summary:
      'A beautiful chromatogram can still lead to an impossible composition.',
    course: 'CHEM 3020',
    preview:
      '/media/chemistry/experiences/a-mixture-over-one-hundred-percent-preview.png',
    previewGif:
      '/media/chemistry/experiences/a-mixture-over-one-hundred-percent-preview.gif',
    previewAlt:
      'An old-fashioned chart recorder feeds paper upward while its horizontal stylus draws colored chromatographic peaks.',
  },
  {
    slug: 'tea-and-an-unexpected-answer',
    title: 'Tea, extraction, and an unexpected answer',
    summary:
      'Two similar spectra turned a familiar drink into a sensitive measurement problem.',
    course: 'CHEM 3020',
    preview:
      '/media/chemistry/experiences/tea-and-an-unexpected-answer-preview.png',
    previewGif:
      '/media/chemistry/experiences/tea-and-an-unexpected-answer-preview.gif',
    previewAlt:
      'Two similar spectral curves shift slightly while their small difference and an inferred estimate cross zero beside a tea cup.',
  },
  {
    slug: 'a-half-life-in-noisy-counts',
    title: 'A half-life hidden in noisy counts',
    summary:
      'Individual clicks are unpredictable. A statistical pattern can still emerge.',
    course: 'CHEM 3030',
    preview:
      '/media/chemistry/experiences/a-half-life-in-noisy-counts-preview.png',
    previewGif:
      '/media/chemistry/experiences/a-half-life-in-noisy-counts-preview.gif',
    previewAlt:
      'A trefoil symbol and hanging cylindrical detector accompany radiation traveling upward from a sample plate.',
  },
  {
    slug: 'four-unknowns',
    title: 'Four unknowns on the final lab bench',
    summary:
      'An open-ended practical brought identification, calibration, and judgment together.',
    course: 'CHEM 3020',
    preview: '/media/chemistry/experiences/four-unknowns-preview.png',
    previewGif: '/media/chemistry/experiences/four-unknowns-preview.gif',
    previewAlt:
      'Four unknown samples show powder, a flexible film, a moving liquid surface, and a softly glowing solution.',
  },
]
