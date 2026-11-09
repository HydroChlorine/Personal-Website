# Writing future project stories

Carry forward the approach of “Molecules, meet computation” and the math sketches:

- Begin with the question, a concrete picture, and why Lichen wanted to explore it. Write in an approachable first-person voice without inventing biography or motivations.
- Let each figure do one explanatory job. Favor short paragraphs around it; introduce the idea before its notation.
- Keep the main reading path understandable to a curious visitor outside the field. Put derivations, code, parameters, and specialist details in optional disclosures when useful.
- For new article figures, use the established pixel-first / crisp-comparison pattern when both views add value. For mathematics topics, both styles should animate from identical drawing commands, frame phases, and timing: generate the crisp GIF by antialiased high-resolution rendering, never by upscaling a pixel GIF. Use the shared `mathFigure` helper and generation pipeline so new topics inherit this behavior. Supply PNG pixel stills and static SVG crisp views for pause/reduced motion, and layouts that remain readable on phones. Do not manufacture toggle controls for a single available view.
- Explain practical choices in context. Be candid about what was tried and what remains a question, without turning every student project into a list of limitations.
- Separate demonstrated results, illustrative or synthetic examples, and future ideas. Do not imply a planned paper has been written or that an illustrative spectrum was measured.
- Keep citations near the relevant idea or in a clearly named reading disclosure. Record art, code, and licenses in the attribution file and public credits. Never reuse third-party work without checking its actual license.

This is an editorial guide for future work, not permission to fill unknown project details.
