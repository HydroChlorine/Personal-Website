import { profile } from '../../content/profile'
import { PixelIcon } from './PixelIcon'

export function CvLink() {
  return (
    <a
      className="cv-link"
      href={profile.cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      type="application/pdf"
      aria-label="Open Lichen Huang’s CV (PDF, opens in a new tab)"
    >
      <span className="cv-file" aria-hidden="true">
        <span className="cv-file-corner" />
        <strong>CV</strong>
        <span className="cv-file-lines">
          ━━
          <br />
          ━━━━
        </span>
        <span className="cv-file-format">PDF ↗</span>
      </span>
      <span className="welcome-stamp" aria-hidden="true">
        <PixelIcon name="chemistry" />
        <span>
          Lab
          <br />
          APPROVED
        </span>
      </span>
      <span className="cv-link-caption">Open my CV ↗</span>
    </a>
  )
}
