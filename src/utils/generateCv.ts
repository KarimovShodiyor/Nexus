import { DEVELOPER_INFO, SKILLS, PROJECTS } from '../data/portfolioData';

export function downloadDeveloperCv() {
  const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${DEVELOPER_INFO.fullName} — CV / Resume (STRAVEX)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #07090e; color: #f1f5f9; margin: 0; padding: 40px; }
    .cv-container { max-width: 800px; margin: 0 auto; background: #0d121f; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    h1 { margin: 0; font-size: 32px; color: #00f0ff; letter-spacing: 2px; }
    h2 { font-size: 18px; color: #94a3b8; margin-top: 4px; font-weight: 400; text-transform: uppercase; letter-spacing: 1px; }
    .contact-bar { display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0; font-size: 14px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; }
    .contact-bar a { color: #00f0ff; text-decoration: none; }
    .section-title { font-size: 18px; color: #00f0ff; border-left: 3px solid #00f0ff; padding-left: 10px; margin: 28px 0 14px 0; text-transform: uppercase; letter-spacing: 1px; }
    p { font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 12px 0; }
    .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }
    .skill-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px 14px; border-radius: 6px; font-size: 13px; }
    .skill-name { font-weight: 600; color: #fff; }
    .skill-level { float: right; color: #00f0ff; }
    .project-card { margin-bottom: 16px; padding: 14px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); }
    .project-title { font-size: 16px; font-weight: 700; color: #fff; }
    .project-tech { font-size: 12px; color: #00f0ff; margin-top: 4px; }
    .print-button { margin-top: 30px; background: #00f0ff; color: #07090e; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
    @media print {
      body { background: #fff; color: #111; padding: 0; }
      .cv-container { border: none; box-shadow: none; padding: 20px; background: #fff; color: #111; }
      h1 { color: #0f172a; }
      .section-title { color: #0f172a; border-left-color: #0f172a; }
      .contact-bar, p, .skill-item { color: #334155; }
      .skill-item { background: #f8fafc; border: 1px solid #e2e8f0; }
      .print-button { display: none; }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <h1>${DEVELOPER_INFO.fullName}</h1>
    <h2>${DEVELOPER_INFO.role} · ${DEVELOPER_INFO.brandName}</h2>
    
    <div class="contact-bar">
      <span>📧 ${DEVELOPER_INFO.email}</span>
      <span>📍 ${DEVELOPER_INFO.location}</span>
      <span>🔗 <a href="${DEVELOPER_INFO.github}">GitHub Profile</a></span>
      <span>💬 <a href="${DEVELOPER_INFO.telegram}">Telegram</a></span>
    </div>

    <div class="section-title">Professional Summary</div>
    <p>${DEVELOPER_INFO.bioSummary}</p>
    <p>${DEVELOPER_INFO.detailedBio}</p>

    <div class="section-title">Core Technical Proficiencies</div>
    <div class="skills-grid">
      ${SKILLS.map(s => `
        <div class="skill-item">
          <span class="skill-name">${s.name}</span>
          <span class="skill-level">${s.level}% (${s.experienceYears})</span>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">${s.description}</div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">Featured Production Projects</div>
    ${PROJECTS.map(p => `
      <div class="project-card">
        <div class="project-title">${p.title} <span style="font-size: 12px; font-weight: 400; color: #94a3b8;">(${p.year})</span></div>
        <p style="margin: 6px 0;">${p.description}</p>
        <div class="project-tech">Tech Stack: ${p.technologies.join(' · ')}</div>
      </div>
    `).join('')}

    <div class="section-title">Engineering Philosophy</div>
    <p>• <strong>Kinetic Ergonomics:</strong> Micro-interactions designed for seamless spatial comprehension and 60fps responsiveness.</p>
    <p>• <strong>Architectural Cleanliness:</strong> Strict TypeScript contracts, maintainable module decomposition, and zero dependency bloat.</p>
    <p>• <strong>Accessibility & Standards:</strong> Full semantic markup, WCAG compliance, and fluid responsive design across all viewports.</p>

    <div style="text-align: center; margin-top: 30px;">
      <button class="print-button" onclick="window.print()">Print or Save as PDF</button>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([cvHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Karimov_Shodiyor_STRAVEX_CV.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
