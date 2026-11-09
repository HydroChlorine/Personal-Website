# Mathematics / first round

Six original night-study banners, drawn numerically in `scripts/animate-mathematics.py`. Public assets live in `public/art/mathematics/v1/`; the contact sheet lives in `assets/art-source/mathematics/v1/`. No borrowed artwork, screenshots, or third-party implementation code. The uploaded Legendre plot was a conceptual reference, not a raster source.

## Art and playback

- Midnight navy, muted cyan/mint, amber desk lamp, small coral accents. Native 384 × 128 logical grid, enlarged 3× with nearest-neighbor sampling; 32-color GIF palette. No photographic filtering or fine texture.
- Each loop is 16 seconds. Topic changes every 30 seconds of uninterrupted visible playback; click, tap, Enter, or Space on the banner advances using the same sequence. Manual advance restarts the timer.
- Independent chemistry/math positions persist while navigating in this mounted layout. Inactive subjects do not rotate. Hidden tabs and paused motion stop the timer. Resume starts a fresh interval.
- Paused motion and the existing reduced-motion preference select real PNG stills, including the portrait sources. GIF failure falls back to the corresponding still. No extra motion controls.
- At widths up to 540px, a 256 × 224 logical portrait companion puts the diagram below the HTML copy. Larger screens use the wide scene. Page diagrams are lazy-loaded stills, avoiding six concurrent GIFs below the fold.
- Math context includes `/mathematics`, its descendants, math project filters, and catalogued math projects/notes. Shared chemistry projects and notes take precedence: “Molecules, meet computation” stays at the laboratory bench. Unknown detail routes keep campus art.

## What the sketches actually show

1. **Interpolation.** `f(x)=1/(1+25x²)`, 11 nodes, degree at most 10. Original barycentric evaluation. Equal nodes versus Chebyshev–Lobatto nodes `-cos(jπ/10)`, identical domain and y scale. This changes node placement, not simply the polynomial basis. A 2,001-point validation grid gives max errors approximately 1.916 and 0.132. This is one demonstration, not a guarantee for arbitrary data or functions.
2. **Legendre.** Recurrence generates P₀…P₅, revealed in order. The product P₂P₃ has equal signed areas on [-1,1]; the animation shows cancellation. The final signed polar curve uses radius `abs(P₂(cos θ))` and colors its sign. It illustrates the angular factor of an m=0 spherical harmonic, not a complete atomic orbital, a probability density, or an electron trajectory. A Gauss–Legendre quadrature check verifies the full P₀…P₅ Gram matrix against diagonal entries `2/(2n+1)`.
3. **Matrices.** An explicit nonsymmetric real 3×3 matrix is built from a known orthogonal similarity to a triangular matrix with eigenvalues 5, 2, 0.7. NumPy QR gives the exact factorization (up to roundoff); 48 unshifted QR steps give `Tₖ₊₁=RₖQₖ`, while accumulating the orthogonal transformations. The endpoint satisfies `A=ZTZᵀ`. Brightness encodes magnitude, cyan positive and coral negative; dots mark numerical zeros. General real Schur forms may contain 2×2 diagonal blocks for complex-conjugate pairs. QR factorization itself is not an approximation.
4. **Algebra.** A square rotates through quarter turns, a subset of its D₄ symmetries. This is group theory; the square is not an algebraic ring. A separate small example works in ℚ[x,y] with ideal `<x²+y²−1, x−y>`. A lexicographic Gröbner basis, x>y, is `{x−y, y²−1/2}`. Both generators and the basis describe the same real points `(±1/√2, ±1/√2)` with matching signs. Identity `x²+y²−1=(x+y)(x−y)+2(y²−1/2)` proves ideal equality (and can be rearranged for the reverse inclusion). The leading monomials x and y² are coprime, so the S-polynomial reduces to zero. It is a toy algebraic geometry example, not a model derived from a particular molecule or crystal.
5. **Dynamics.** Lorenz ODEs with σ=10, ρ=28, β=8/3, RK4 step 0.005, initial state (1,1,1), 10 time units discarded. Display is an x-z projection, with 90 time units of retained trajectory drawn on an accelerated visual clock. Markers show the two **nonzero** equilibria `(±√72, ±√72, 27)`; the origin is the third equilibrium. The loop fades rather than inventing a connection between its endpoints. This is an ODE reduction of convection dynamics, not a PDE simulation.
6. **Fourier.** Synthetic real FID-like signal, 512 samples over one unit of time: three exponentially damped cosines with frequencies 12, 28, 47 and amplitudes 1, .65, .4. Its actual real FFT magnitude is shown through bin 80, then the component signals separately, then the inverse-FFT reconstruction. No chemical-shift calibration, experimental data, instrument resolution claim, or full FTIR acquisition simulation. The inverse FFT is checked for round-trip accuracy. The page explains the distinct NMR FID and FTIR interferogram connections.

## Rebuild and verify

Run with Python 3, NumPy, and Pillow:

```sh
python3 scripts/animate-mathematics.py
python3 scripts/verify-mathematics-assets.py
npm test
npm run build
```

The drawing script currently uses the macOS system Menlo font at 8 logical pixels with monochrome glyph rendering. Font files are not copied into the repository. For another OS, point `FONT` to a locally available monospace font before rebuilding; generated public files require no runtime Python or font dependency.

## References

All illustrations and algorithms here were written anew; references supply mathematical context, not borrowed media or code. Public links are maintained in `src/content/mathematicsReferences.ts` and shown on the math page and credits page.

- [Chebfun Guide, Chapter 4](https://www.chebfun.org/docs/guide/guide04.html): Chebyshev nodes and Runge's phenomenon.
- [NIST DLMF 18.3](https://dlmf.nist.gov/18.3), [14.30](https://dlmf.nist.gov/14.30): orthogonality and spherical harmonics.
- [LAPACK QR](https://www.netlib.org/lapack/lug/node40.html), [Schur](https://www.netlib.org/lapack/lug/node50.html): factorization definitions.
- [Macaulay2 tutorial](https://macaulay2.com/doc/Macaulay2/share/doc/Macaulay2/Macaulay2Doc/html/___Tutorial_co_sp__Elementary_spuses_spof_sp__Gr%C3%B6bner_spbases.html): polynomial rings, ideals, Gröbner bases, elimination.
- [Lorenz, 1963](https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2): original dynamical system.
- [University of Wyoming NMR Basics](https://www.uwyo.edu/chemistry/instrumentation/NMR/Introduction.html): FIDs and Fourier spectra.
- [Shimadzu FTIR](https://www.shimadzu.eu/service-support/technical-support/ftir/tips_and_tricks/apodization.html): interferograms and Fourier transformation.

The semester paper has only a clearly labeled planning shelf. Its title, problem, findings, and downloadable paper await the user's actual work. The chemistry ring-closing story remains unchanged.

## Verification recorded 2026-11-08

- Offline numerical and asset validator passed: 12 looping GIFs, 12 pause stills, 6 study diagrams; 16-second loop timing and exact nearest-neighbor pixel blocks checked.
- All 19 Node tests passed, including math context and chemistry precedence. Production TypeScript/Vite build and targeted Prettier check passed; `git diff --check` passed.
- Browser review at 1280 × 900 and 390 × 844: whole diagrams visible, portrait source selected on phone, no horizontal page overflow. Saved views: `docs/previews/2026-11-08/mathematics-desktop.png`, `mathematics-mobile.png`, and `math-sketches.png`.
- Enter, Space, and click advance tested while paused; sources stayed PNG. Resuming selected GIFs. Observed interpolation advance to Legendre after the 30-second interval (checked at 36 seconds).
- Navigated through the mathematics project filter to Catalyst Discovery: collection retained mathematics art, article selected chemistry art. Returning to math retained its independent position. Browser console had no warnings or errors.
