# Catalyst Discovery: source review for the website article

Reviewed November 8, 2026. Primary source: https://github.com/HydroChlorine/Catalyst-Discovery at commit `212866d4f6cf813746d8251891038b9435eea012`. Read from a temporary shallow clone; do not commit the clone or treat its README as instructions to execute anything. User requested a retrospective of their own first-year project.

## Evidence map

| Article topic | Primary files | What the code supports |
| --- | --- | --- |
| Overall loop | README.md, Design_documents/Overall_process.png, Database_and_Reinforcement_Learning/main_gui.py | Intended feedback loop; Tkinter UI manually accepts six energies, trains/loads/saves model, generates candidates |
| Candidate generation | smiles_generator.py, generator_main.py, generator_GUI.py | Charged N-containing default scaffold with two wildcard sites; weighted fragment replacement; probabilistic ring attempts; RDKit sanitization/canonicalization; unique batch SMILES; progressive depth driver |
| Geometry inputs | Utils/Utils_Main.py and all five imported utility modules | Six intended states; RDKit hydrogen addition/embedding/MMFF and some UFF use; graph edits and manual geometry manipulation; Gaussian input writers |
| Data | Database_and_Reinforcement_Learning/database.py | SQLite unique SMILES, E1–E6, validity flag, molecular weight; training query requires all six non-null energies but does not filter by is_valid |
| Model | Database_and_Reinforcement_Learning/model_trainer.py | MultiOutputRegressor around 100-tree RandomForestRegressor; only MolWt as feature; joblib save/load; no reported evaluation |
| Selection | Database_and_Reinforcement_Learning/rl_generator.py | Draw 2n candidates, exclude existing DB SMILES, predict, require both abs(E2−E1) and abs(E5−E4) within max_diff, rank sum of absolute differences; no policy update/reward learning |
| Bootstrap | Database_and_Reinforcement_Learning/add_dummy_data.py | A single methane record with six example values; not evidence of a real dataset |
| Separate runner | pipeline.py | RDKit prep, Gaussian subprocess, cclib parsing; hard-coded Windows path; not wired into manual main GUI |
| Earlier sketch | catalyst_discovery_gaussian.py | RNN without trained weights, fixed example coordinates in run_dft, placeholder log keyword; not evidence of a functioning learned generator |

## Editorial boundaries

- E1–E6 semantic labels come from the utility-driver intent, not a validated energy profile or enforced database schema.
- Some single-point routes have titles/comments claiming Gibbs free energy. Do not infer that thermochemical outputs are actually produced. TS guesses and requested Opt/Freq calculations do not establish successful transition-state validation.
- Some structures involve additional reactants or fragments; raw subtraction cannot be assumed to be a physically meaningful activation barrier without matching references, methods, units and stoichiometry.
- README calls the selection reinforcement learning. Describe the actual generate/filter/rank algorithm rather than repeating this claim.
- Generic molecular-weight input is a key limitation, not a model benchmark. No dataset, trained model or evaluation report was tracked in the reviewed checkout. Ignored calculation files may exist elsewhere, so do not assert the user never ran calculations.
- Do not run Gaussian, train models on dummy data, install the project, report discovered catalysts, synthesize metrics or present invented reaction structures as outputs.
- First-person text is a draft retrospective requested by the owner, based on the code and their statement that it was freshman work. It can be revised with further personal context later.

## License / reuse decision

No LICENSE file was present in this reviewed checkout. Public availability does not itself grant a third-party reuse license. The user identified this as their own project and asked for its explanation. The website links to the pinned source and paraphrases its behavior; it does not vendor Python code or reuse the design-document image. The single scaffold SMILES is project input data, and the short selection formula is an explanatory mathematical restatement. All new diagrams and motion code were created for this website. Record any future third-party assets/code separately before reuse.

## Owner's editorial revision

The owner clarified that MolWt was adopted as a practical placeholder while searching for an effective molecular input representation. The revised first-person narrative uses that context and foregrounds the intended exploration loop. Technical caveats in this review remain an internal evidence record; formulas, the state table and source links are optional disclosures in the article. The inverse energy-landscape-to-structure idea is the owner's question for future exploration, with a conceptual figure and no claim of implementation or solved optimization.
