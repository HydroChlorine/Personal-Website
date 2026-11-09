import type { ProjectArticle } from '../types'
import { mathFigure } from './figure.ts'
import { mathSources as s } from './sources.ts'
const fig = (
  name: string,
  alt: string,
  caption: string,
  height = 600,
  mobileHeight = 1000,
) => mathFigure(name, alt, caption, height, mobileHeight)
export const fourierArticle: ProjectArticle = {
  kind: 'topic',
  kicker: 'From heat to hidden frequencies—and back to the instruments',
  reviewed: '2026-11-09',
  introduction: [
    'An NMR receiver does not start by handing us a neat row of peaks. It records an evolving signal. An FTIR instrument records an interferogram. A change of representation helps turn those observations into something we can interpret.',
    'The Fourier transform is that change of representation. The FFT is a family of fast algorithms for its discrete counterpart. Understanding the distinction makes instrument settings less mysterious: collecting longer, repeating more scans, padding with zeros, and smoothing are different actions with different effects.',
    'All signals below are synthetic. They let us separate what the mathematics computes from what a physical experiment has actually measured.',
  ],
  sections: [
    {
      id: 'heat',
      title: '01 / Before spectra, there was heat',
      paragraphs: [
        'Fourier’s work on heat led to representing a spatial temperature profile through trigonometric modes. His 1822 treatise made this a central mathematical tool. In a simple heat equation, each mode evolves independently, and finer spatial oscillations decay faster.',
        'The useful pattern is bigger than heat: a complicated object in one representation can become a collection of simpler components in another. Continuous transforms and discrete relatives carry that viewpoint into communication, imaging, audio, and spectroscopy.',
        'Without fast transforms, many modern workflows would become more expensive or require different designs. The FFT did not make these physical phenomena exist; it made a useful computation affordable at scale.',
      ],
      equations: [
        {
          label: 'A heat mode in a periodic model',
          expression: '∂u/∂t=κ ∂²u/∂x²\nuₖ(x,t)=aₖ exp(−κk²t) sin(kx)',
        },
      ],
      figure: fig(
        'heat-modes',
        'A sum of three heat modes relaxes as their calculated amplitudes decay at different rates.',
        'An exact finite-mode solution of a periodic heat equation, not a thermal measurement. High spatial frequencies fade faster.',
      ),
      sources: [s.fourierHistory],
    },
    {
      id: 'phasors',
      title: '02 / A frequency is a rotating question',
      paragraphs: [
        'Euler’s formula bundles a sine and cosine into a rotating point on the complex plane. To ask whether a signal contains a frequency, multiply it by a rotation in the opposite direction and accumulate. A matching component lines up; many mismatched contributions cancel.',
        'For N samples, the DFT uses roots of unity: equally spaced complex points satisfying zᴺ=1. Multiplication cycles through them. This is a small algebraic symmetry hiding inside a signal-processing tool.',
        'A DFT is an invertible change of coordinates on a finite sample vector. It does not recover every property of an arbitrary continuous signal without assumptions. Sampling, finite observation length, and noise still determine what those coordinates can tell us.',
      ],
      equations: [
        {
          label: 'A consistent forward/inverse convention',
          expression:
            'Xₖ=Σₙ₌₀ᴺ⁻¹ xₙ exp(−2πikn/N)\nxₙ=(1/N)Σₖ₌₀ᴺ⁻¹ Xₖ exp(2πikn/N)',
        },
      ],
      figure: fig(
        'roots-unity',
        'Roots of unity and weighted phasor sums show cancellation in one Fourier bin and alignment in a matching bin.',
        'Calculated finite sums for an eight-sample cosine. These are complex contributions, not physical motion of the sample.',
      ),
      sources: [s.fftDefinitions],
    },
    {
      id: 'fft',
      title: '03 / The FFT reuses the symmetries',
      paragraphs: [
        'Computing every DFT output with its own full sum takes order N² arithmetic. A radix-two FFT splits even and odd samples, solves the smaller transforms, and combines their results through repeated phase factors. The same roots of unity keep appearing, so their work can be reused.',
        'The result is the same DFT up to floating-point rounding, with order N log N work for this algorithm. Cooley and Tukey’s 1965 paper helped make these methods widespread. FFT techniques have a longer history and many variants; powers of two are convenient, not the only sizes modern software can handle.',
        'Fast does not mean throwing away frequency components. An FFT can retain all coefficients. Deliberate filtering or compression is another step.',
      ],
      figure: fig(
        'fft-butterfly',
        'An eight-point radix-two butterfly highlights computed stages and the magnitudes of the resulting DFT coefficients.',
        'The illustrated algorithm is implemented and checked against a direct DFT and NumPy’s FFT. Work scaling is not a hardware timing benchmark.',
      ),
      detailParagraphs: [
        'For N=2M, let E and O be the M-point transforms of even and odd samples. Xₖ=Eₖ+exp(−2πik/N)Oₖ and Xₖ₊ᴹ=Eₖ−exp(−2πik/N)Oₖ. Recursion produces the butterfly network. Libraries differ in normalization and exponent sign; use a consistent forward/inverse pair.',
      ],
      sources: [s.fft, s.fftDefinitions],
    },
    {
      id: 'nmr',
      title: '04 / NMR: a decay becomes a spectrum',
      paragraphs: [
        'After excitation, coherent transverse magnetization induces a receiver signal called the free-induction decay, or FID. A simple model adds damped complex oscillations with different amplitudes, frequencies, phases, and effective decay times. Real spectra can also reflect coupling, exchange, field inhomogeneity, and other effects.',
        'Fourier transformation expresses the time signal through frequency components. Quadrature detection and phase correction help produce an absorptive spectrum rather than just the magnitude of a real trace. Referencing then connects frequency offsets to a chemical-shift axis.',
        'Here we transform an actual synthetic complex signal and separate its components. It is a signal model, not a quantum calculation of an assigned molecule; peak heights are not calibrated concentrations.',
      ],
      equations: [
        {
          label: 'An introductory FID model',
          expression: 's(t)=Σⱼ Aⱼ exp(−t/T₂*ⱼ) exp[i(2πfⱼt+φⱼ)]',
        },
      ],
      figure: fig(
        'nmr-transform',
        'The real receiver channel, constituent oscillations, and FFT magnitude are drawn from one synthetic complex FID.',
        'The spectrum uses the full complex signal. Magnitude is used for this illustration; quantitative NMR needs appropriate phasing, referencing, relaxation, and other checks.',
        600,
        1300,
      ),
      sources: [s.nmrProcessing],
    },
    {
      id: 'ftir',
      title: '05 / FTIR: the axis is optical path difference',
      paragraphs: [
        'An FTIR interferometer combines light along different paths. The interferogram varies with optical path difference: each wavenumber contributes an oscillation across that path coordinate. A Fourier transform recovers a spectral intensity distribution.',
        'The idea resembles the NMR transformation, but its independent variable is path difference rather than acquisition time. In a Michelson geometry, a mirror movement changes the round-trip path difference by twice that displacement.',
        'Absorption also needs a reference. Transform sample and background interferograms, take their intensity ratio for transmittance, then use −log₁₀ of that ratio for absorbance. The maximum measured path difference sets a resolution scale; conventions and apodization affect its details.',
      ],
      equations: [
        {
          label: 'The transform and the reference step',
          expression:
            'I(δ) ∝ ∫ S(ν̃) cos(2πν̃δ) dν̃\nT=S_sample/S_reference\nA=−log₁₀T',
        },
      ],
      figure: fig(
        'ftir-transform',
        'Synthetic sample and background interferograms are transformed into spectra and normalized to obtain two absorbance bands.',
        'Computed in normalized path and wavenumber-index units. The source profile and bands are made up; reference normalization is a real processing step.',
        600,
        1300,
      ),
      sources: [s.ftir, s.ftirResolution],
    },
    {
      id: 'scans',
      title: '06 / Four times the scans means twice the signal-to-noise',
      paragraphs: [
        'Suppose the signal repeats coherently while each scan adds independent zero-mean noise with equal variance. Averaging N scans preserves the mean signal and reduces noise standard deviation by √N. Doubling signal-to-noise then requires four times as many scans.',
        'This is not a rule that four times the scans doubles spectral resolution. Averaging improves visibility and precision, which may make weak features easier to recognize, but does not itself extend the observation window or narrow an intrinsic linewidth.',
        'Drift, interference, correlated noise, changing samples, relaxation, and recycle delays can alter the benefit per unit time. The FFT also transforms noise; it does not remove it automatically.',
      ],
      equations: [
        {
          label: 'Under independent, equal-variance noise',
          expression: 'σ_average=σ_single/√N\nSNR_N∝√N\nN→4N  ⇒  SNR→2 SNR',
        },
      ],
      figure: fig(
        'scans-and-noise',
        'The same synthetic signal is averaged across one, four, and sixteen noisy scans, with corresponding spectra and expected noise scales.',
        'Acquisition length is fixed. The √N labels describe expected scaling, not an exact ratio for every finite random realization.',
        700,
        1600,
      ),
      aside: {
        title: 'Two knobs, two questions',
        text: 'More scans mainly asks “can I see the signal above the noise?” A longer useful acquisition asks “can I distinguish finer frequency structure?” Neither bypasses the physical coherence and linewidth limits.',
      },
      sources: [s.nmrScans],
    },
    {
      id: 'resolution',
      title: '07 / Collecting longer is not the same as adding zeros',
      paragraphs: [
        'For N complex samples separated by Δt, the acquisition duration is approximately T=NΔt. The natural DFT grid spacing is 1/T. A longer useful observation can improve frequency discrimination if the signal persists and other broadening does not dominate.',
        'Zero filling adds no observations. It evaluates the finite-record spectrum on a denser grid, improving appearance and helping locate a peak on that grid. It does not add the late-time phase information needed to separate genuinely unresolved components.',
        'An ideal exponential FID gives an absorptive Lorentzian linewidth of about 1/(πT₂*). Observing far beyond a useful decay mainly collects noise. We should distinguish displayed point spacing, finite-record effects, and physical line separation.',
      ],
      equations: [
        {
          label: 'Different meanings of spectral fineness',
          expression:
            'T≈NΔt,   Δf_grid=1/T\nzero fill to M: displayed spacing=1/(MΔt)\nexponential linewidth≈1/(πT₂*)',
        },
      ],
      figure: fig(
        'resolution-padding',
        'Two close resonances are compared using a short record, the same record zero filled, and a longer record.',
        'Only the final panel contains additional observations. A smoother zero-filled spectrum is not new resolving power.',
        600,
        1300,
      ),
      detailParagraphs: [
        'The formulas count complex samples; instrument point-count conventions can differ. Limited duration, relaxation, overlap, and noise all affect practical discrimination. Increasing increments along multiple indirect dimensions can multiply acquisition time, but that is a different counting problem from √N scan averaging.',
      ],
      sources: [s.nmrProcessing, s.nmrScans],
    },
    {
      id: 'processing',
      title: '08 / Filtering has a bargain attached',
      paragraphs: [
        'Multiplying an FID by a window changes its spectrum. Exponential weighting suppresses the late portion, where the signal may be weak relative to noise, but also broadens an ideal Lorentzian. Other windows make different compromises between linewidth, sidelobes, and noise.',
        'Sampling too slowly creates aliasing: distinct continuous oscillations can produce the same sample sequence. The FFT cannot infer which one was present from those values alone. Acquisition bandwidth and filtering have to make the intended interpretation possible.',
        'Phase, baseline, reference, and artifact checks also matter. Removing everything small could remove a real weak signal. A processed spectrum reflects acquisition and processing choices together, not an untouched sample speaking directly.',
      ],
      figure: fig(
        'window-tradeoff',
        'A noisy synthetic FID is exponentially weighted and its FFT compared with the unweighted transform.',
        'The same observations, a different estimator. The noise contribution changes, but the peak also broadens.',
      ),
      figures: [
        fig(
          'sampling-alias',
          'Cosines at 8 and 40 Hz and their continuous difference are plotted against time in seconds; orange sample markers lie at zero difference.',
          'Between the orange sample times the waves differ; at every acquired sample their difference is zero. Here 40−32=8 Hz: sampling has made two distinct waves indistinguishable.',
        ),
      ],
      sources: [s.nmrProcessing, s.fftDefinitions],
    },
    {
      id: 'connections',
      title: '09 / One representation connects distant subjects',
      paragraphs: [
        'Roots of unity give the FFT an algebraic engine. Heat modes offer an early physical example. NMR and FTIR expose different kinds of measured structure. The language travels because many problems reward decomposition into oscillatory components.',
        'Its boundaries are useful too. A transform cannot create missing data, guarantee a chemical peak, or make noise average faster than acquisition allows. Understanding that turns a convenient processing button into a tool we can reason about.',
      ],
    },
  ],
}
