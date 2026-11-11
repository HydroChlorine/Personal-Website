// Lightweight collection metadata; article bodies are loaded with the detail route.
export const chemistryExperienceCards: {
  slug: string
  title: string
  summary: string
  category: 'Analytical chemistry' | 'Physical chemistry'
  preview: string
  previewGif: string
  previewAlt: string
}[] = [
  {
    slug: 'tonic-water-fluorescence',
    title: 'Tonic water and a stubborn fluorimeter',
    summary:
      'Quinine, chloride and a linked fluorescence model for an ordinary bottle of tonic water.',
    category: 'Analytical chemistry',
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
      'Use temperature-dependent NMR line shapes to investigate restricted rotation around an amide bond.',
    category: 'Physical chemistry',
    preview: '/media/chemistry/experiences/two-peaks-become-one-preview.png',
    previewGif: '/media/chemistry/experiences/two-peaks-become-one-preview.gif',
    previewAlt:
      'Two NMR peaks broaden and merge while a thermometer rises beside the spectral display.',
  },
  {
    slug: 'spinach-fluorescence',
    title: 'Spinach under a different light',
    summary:
      'Extract chlorophyll, separate the pigments, and ask why fluorescence stops growing proportionally.',
    category: 'Physical chemistry',
    preview: '/media/chemistry/experiences/spinach-fluorescence-preview.png',
    previewGif: '/media/chemistry/experiences/spinach-fluorescence-preview.gif',
    previewAlt:
      'A gently moving spinach leaf beside a cuvette; light penetrates less deeply as its green solution becomes concentrated.',
  },
  {
    slug: 'beyond-the-library-match',
    title: 'When the spectral library suggests the wrong compound',
    summary:
      'Berberine, a formulated tablet, and the chemical judgment behind an infrared identification.',
    category: 'Analytical chemistry',
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
      'Fit a universal indicator as five overlapping spectra—and choose a pH that makes the ingredients visible.',
    category: 'Analytical chemistry',
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
      'Laser ionization, flight times and source tuning turn molecular ions into measurable arrival peaks.',
    category: 'Physical chemistry',
    preview: '/media/chemistry/experiences/ions-in-flight-preview.png',
    previewGif: '/media/chemistry/experiences/ions-in-flight-preview.gif',
    previewAlt:
      'A laser pulse starts three illustrative ions, which fly at different speeds toward a detector.',
  },
  {
    slug: 'a-reaction-in-fading-color',
    title: 'Following a reaction as its color fades',
    summary:
      'Bromination rates, isosbestic wavelengths and a hydrogen/deuterium comparison probe a mechanism.',
    category: 'Physical chemistry',
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
      'Compare combustion of methyl methacrylate and PMMA to ask about polymerization enthalpy.',
    category: 'Physical chemistry',
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
      'Use DCl, methane and CD₃H spectra to connect line patterns with molecular mass and motion.',
    category: 'Physical chemistry',
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
      'Interferogram echoes and spectral fringes turn an empty cell into an optical-distance measurement.',
    category: 'Analytical chemistry',
    preview: '/media/chemistry/experiences/the-empty-cell-spectrum-preview.png',
    previewGif:
      '/media/chemistry/experiences/the-empty-cell-spectrum-preview.gif',
    previewAlt:
      'The view enlarges the full separation between an interferogram centerburst and its right-hand ghost; an animated line measures that interval.',
  },
  {
    slug: 'sweeping-the-voltage',
    title: 'Sweeping the voltage, watching the chemistry',
    summary:
      'From ferricyanide to acetaminophen: connect a voltammogram with redox behavior and concentration.',
    category: 'Analytical chemistry',
    preview: '/media/chemistry/experiences/sweeping-the-voltage-preview.png',
    previewGif: '/media/chemistry/experiences/sweeping-the-voltage-preview.gif',
    previewAlt:
      'A cyclic voltammogram is traced forward and backward into its characteristic loop.',
  },
  {
    slug: 'a-mixture-over-one-hundred-percent',
    title: 'A mixture that added up to more than 100 percent',
    summary:
      'A solvent-mixture analysis separates peaks successfully, then fails a mass-balance check.',
    category: 'Analytical chemistry',
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
      'Combine UV absorption and extraction to distinguish caffeine from a strongly overlapping absorber.',
    category: 'Analytical chemistry',
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
      'Counting statistics, an exponential fit and a gamma spectrum help identify a short-lived nuclide.',
    category: 'Physical chemistry',
    preview:
      '/media/chemistry/experiences/a-half-life-in-noisy-counts-preview.png',
    previewGif:
      '/media/chemistry/experiences/a-half-life-in-noisy-counts-preview.gif',
    previewAlt:
      'An opaque red gamma detector with black end caps hangs over a sample; the screen accumulates an energy spectrum with a photopeak.',
  },
  {
    slug: 'four-unknowns',
    title: 'Four unknowns on the bench',
    summary:
      'Choose infrared, absorption and fluorescence measurements for two solids and two solutions.',
    category: 'Analytical chemistry',
    preview: '/media/chemistry/experiences/four-unknowns-preview.png',
    previewGif: '/media/chemistry/experiences/four-unknowns-preview.gif',
    previewAlt:
      'Two colored solutions undergo optical measurements beside two colored solid samples on an infrared sampling stage.',
  },
]
