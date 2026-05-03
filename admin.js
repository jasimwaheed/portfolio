// ============================================
// ADMIN PANEL JS - M.JASIM WAHEED Portfolio
// ============================================

'use strict';

const ADMIN_PASSWORD = 'jasimkhan5917@gmail.com';

// ---- AUTH ----
function checkAuth() {
  return sessionStorage.getItem('admin_auth') === 'true';
}

function login(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('admin_auth');
  window.location.reload();
}

// ---- DATA ----
function getProjects() {
  try { return JSON.parse(localStorage.getItem('portfolio_projects') || '[]'); }
  catch { return []; }
}

function saveProjects(projects) {
  localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

function getMessages() {
  try { return JSON.parse(localStorage.getItem('portfolio_messages') || '[]'); }
  catch { return []; }
}

function generateId() {
  return 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// ---- LOGIN UI ----
function renderLogin() {
  document.body.innerHTML = `
    <div class="admin-body" style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#010a04;">
      <div style="width:100%;max-width:420px;padding:20px;">
        <div class="login-card">
          <div class="login-logo">
            <h1>⚡ JASIM.DEV</h1>
            <p>// Admin Access Panel</p>
          </div>
          <div id="loginError" class="login-error">
            <span>⚠</span> <span>Invalid password. Try again.</span>
          </div>
          <div class="form-group">
            <label>USERNAME</label>
            <input type="text" value="admin" readonly style="opacity:0.5;cursor:default;">
          </div>
          <div class="form-group">
            <label>PASSWORD</label>
            <input type="password" id="adminPass" placeholder="Enter admin password" 
              style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:4px;padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:0.95rem;outline:none;">
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="handleLogin()">
            🔐 ACCESS ADMIN
          </button>
          <p style="text-align:center;margin-top:20px;">
            <a href="../index.html" style="color:var(--text-muted);font-family:var(--font-mono);font-size:0.75rem;text-decoration:none;">← Back to Portfolio</a>
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('adminPass').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
}

function handleLogin() {
  const pass = document.getElementById('adminPass').value;
  if (login(pass)) {
    renderAdmin();
    // Login ke baad seedha Projects panel khulega
    setTimeout(() => {
      showPanel('projects', document.querySelector('[onclick*="projects"]'));
      openProjectModal();
    }, 100);
  } else {
    document.getElementById('loginError').classList.add('show');
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').style.borderColor = 'var(--danger)';
    setTimeout(() => {
      document.getElementById('loginError')?.classList.remove('show');
    }, 3000);
  }
}

// ---- ADMIN UI ----
function renderAdmin() {
  const projects = getProjects();
  const messages = getMessages();

  document.body.innerHTML = `
    <div class="admin-layout">
      <!-- SIDEBAR -->
      <aside class="admin-sidebar">
        <div class="sidebar-logo">
          <h2>⚡ JASIM.DEV</h2>
          <p>// Admin Panel v1.0</p>
        </div>
        <nav class="sidebar-nav">
          <div class="sidebar-section">MAIN</div>
          <button class="sidebar-link active" onclick="showPanel('dashboard', this)">
            <span class="icon">📊</span> Dashboard
          </button>
          <button class="sidebar-link" onclick="showPanel('projects', this)">
            <span class="icon">🚀</span> Projects
          </button>
          <button class="sidebar-link" onclick="showPanel('messages', this)">
            <span class="icon">📬</span> Messages
            ${messages.length > 0 ? `<span style="margin-left:auto;background:var(--primary);color:var(--bg-dark);font-size:0.65rem;padding:2px 7px;border-radius:10px;font-weight:800;">${messages.length}</span>` : ''}
          </button>
          <div class="sidebar-section">CONTENT</div>
          <button class="sidebar-link" onclick="showPanel('about', this)">
            <span class="icon">👤</span> About Info
          </button>
          <button class="sidebar-link" onclick="showPanel('skills', this)">
            <span class="icon">⚙️</span> Skills
          </button>
          <button class="sidebar-link" onclick="showPanel('experience', this)">
            <span class="icon">📋</span> Experience
          </button>
          <div class="sidebar-section">SETTINGS</div>
          <button class="sidebar-link" onclick="showPanel('settings', this)">
            <span class="icon">⚙️</span> Settings
          </button>
          <a href="../index.html" class="sidebar-link">
            <span class="icon">🌐</span> View Portfolio
          </a>
        </nav>
        <div class="sidebar-bottom">
          <button class="admin-logout" onclick="logout()">🔓 Logout</button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="admin-main">
        <!-- DASHBOARD -->
        <div id="panel-dashboard" class="admin-panel active">
          <div class="admin-header">
            <div>
              <h1>DASHBOARD</h1>
              <p>// Welcome back, M. Jasim Waheed</p>
            </div>
            <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">
              ${new Date().toLocaleDateString('en-PK', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}
            </div>
          </div>

          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-card-icon">🚀</div>
              <span class="stat-card-num">${projects.length}</span>
              <span class="stat-card-label">Total Projects</span>
            </div>
            <div class="stat-card">
              <div class="stat-card-icon">📬</div>
              <span class="stat-card-num">${messages.length}</span>
              <span class="stat-card-label">Messages</span>
            </div>
            <div class="stat-card">
              <div class="stat-card-icon">✅</div>
              <span class="stat-card-num">${projects.filter(p => p.status === 'Live').length}</span>
              <span class="stat-card-label">Live Projects</span>
            </div>
            <div class="stat-card">
              <div class="stat-card-icon">🔨</div>
              <span class="stat-card-num">${projects.filter(p => p.status !== 'Live').length}</span>
              <span class="stat-card-label">In Progress</span>
            </div>
          </div>

          <div class="panel-card">
            <div class="panel-card-header">
              <h3>RECENT PROJECTS</h3>
              <button class="btn btn-outline btn-sm" onclick="showPanel('projects', document.querySelector('[onclick*=projects]'))">View All</button>
            </div>
            <div class="panel-card-body">
              ${projects.slice(-3).reverse().map(p => `
                <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--border);">
                  <span style="font-size:1.5rem;">${p.emoji || '🚀'}</span>
                  <div style="flex:1;">
                    <div style="font-weight:600;color:var(--text);">${p.title}</div>
                    <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">${p.category}</div>
                  </div>
                  <span class="project-status status-${p.status === 'Live' ? 'live' : 'dev'}">${p.status}</span>
                </div>
              `).join('') || '<p style="color:var(--text-muted);text-align:center;padding:20px;font-family:var(--font-mono);font-size:0.85rem;">// No projects yet</p>'}
            </div>
          </div>
        </div>

        <!-- PROJECTS PANEL -->
        <div id="panel-projects" class="admin-panel">
          <div class="admin-header">
            <div>
              <h1>PROJECTS</h1>
              <p>// Manage your portfolio projects</p>
            </div>
            <button class="btn btn-primary" onclick="openProjectModal()">+ Add Project</button>
          </div>

          <div class="panel-card">
            <div class="panel-card-header">
              <h3>ALL PROJECTS (${projects.length})</h3>
            </div>
            <div class="panel-card-body" style="padding:0;">
              <table class="data-table" id="projectsTable">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>TECH STACK</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody id="projectsTableBody">
                  ${renderProjectRows(projects)}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- MESSAGES PANEL -->
        <div id="panel-messages" class="admin-panel">
          <div class="admin-header">
            <div>
              <h1>MESSAGES</h1>
              <p>// Contact form submissions</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="clearMessages()" style="border-color:var(--danger);color:var(--danger);">Clear All</button>
          </div>
          <div class="panel-card">
            <div class="panel-card-body">
              ${renderMessages(messages)}
            </div>
          </div>
        </div>

        <!-- ABOUT PANEL -->
        <div id="panel-about" class="admin-panel">
          <div class="admin-header">
            <div><h1>ABOUT INFO</h1><p>// Edit your personal information</p></div>
          </div>
          <div class="panel-card">
            <div class="panel-card-body">
              ${renderAboutForm()}
            </div>
          </div>
        </div>

        <!-- SKILLS PANEL -->
        <div id="panel-skills" class="admin-panel">
          <div class="admin-header">
            <div><h1>SKILLS</h1><p>// Manage your skill categories</p></div>
          </div>
          <div class="panel-card">
            <div class="panel-card-body">
              <p style="color:var(--text-dim);font-size:0.9rem;">Skills are defined in the main JS file. Edit <code style="color:var(--primary);">js/main.js</code> to add/remove skills.</p>
            </div>
          </div>
        </div>

        <!-- EXPERIENCE PANEL -->
        <div id="panel-experience" class="admin-panel">
          <div class="admin-header">
            <div><h1>EXPERIENCE</h1><p>// Career timeline entries</p></div>
            <button class="btn btn-primary" onclick="openExpModal()">+ Add Entry</button>
          </div>
          <div class="panel-card">
            <div class="panel-card-body" id="expList">
              ${renderExpList()}
            </div>
          </div>
        </div>

        <!-- SETTINGS PANEL -->
        <div id="panel-settings" class="admin-panel">
          <div class="admin-header">
            <div><h1>SETTINGS</h1><p>// Portfolio configuration</p></div>
          </div>
          <div class="panel-card">
            <div class="panel-card-header"><h3>SECURITY</h3></div>
            <div class="panel-card-body">
              <div class="form-group">
                <label>Change Admin Password</label>
                <input type="password" id="newPass" placeholder="New password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" id="confirmPass" placeholder="Confirm new password">
              </div>
              <button class="btn btn-primary" onclick="changePassword()">Update Password</button>
            </div>
          </div>
          <div class="panel-card" style="margin-top:20px;">
            <div class="panel-card-header"><h3>DATA</h3></div>
            <div class="panel-card-body">
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-outline" onclick="exportData()">📤 Export All Data</button>
                <button class="btn btn-outline" onclick="document.getElementById('importFile').click()">📥 Import Data</button>
                <input type="file" id="importFile" accept=".json" style="display:none;" onchange="importData(this)">
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- PROJECT MODAL -->
    <div class="modal-overlay" id="projectModal">
      <div class="modal" style="max-width:560px;width:95%;">
        <div class="modal-header">
          <h3 id="modalTitle">➕ ADD PROJECT</h3>
          <button class="modal-close" onclick="closeModal('projectModal')">✕</button>
        </div>
        <div class="modal-body" style="max-height:75vh;overflow-y:auto;">
          <input type="hidden" id="editProjectId">

          <!-- IMAGE SECTION - SABSE PEHLE -->
          <div class="form-group" style="background:rgba(0,255,136,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:16px;margin-bottom:16px;">
            <label style="color:var(--primary);font-size:0.8rem;letter-spacing:1px;">📸 PROJECT IMAGE URL</label>
            <input type="url" id="projImage" placeholder="https://i.imgur.com/yourimage.png" style="margin-top:8px;">
            <div id="imgPreviewWrap" style="margin-top:12px;display:none;position:relative;">
              <img id="imgPreview" src="" alt="Preview" style="width:100%;height:160px;object-fit:cover;border-radius:8px;border:1px solid var(--border);">
              <span style="position:absolute;top:8px;right:8px;background:rgba(0,255,136,0.9);color:#000;font-size:0.65rem;padding:3px 8px;border-radius:4px;font-weight:700;">✓ IMAGE OK</span>
            </div>
            <p style="font-size:0.7rem;color:var(--text-muted);margin-top:8px;font-family:var(--font-mono);">// Imgur · Cloudinary · GitHub Raw · PostImages</p>
          </div>

          <!-- PROJECT NAME -->
          <div class="form-group">
            <label>📝 Project Name *</label>
            <input type="text" id="projTitle" placeholder="Mera Awesome Project">
          </div>

          <!-- DESCRIPTION -->
          <div class="form-group">
            <label>📄 Description *</label>
            <textarea id="projDesc" rows="3" placeholder="Project ka short description..."></textarea>
          </div>

          <!-- CATEGORY + STATUS -->
          <div class="form-row">
            <div class="form-group">
              <label>🏷️ Category *</label>
              <input type="text" id="projCat" placeholder="Web App / Mobile / UI-UX">
            </div>
            <div class="form-group">
              <label>📌 Status</label>
              <select id="projStatus">
                <option value="Live">✅ Live</option>
                <option value="In Progress">🔨 In Progress</option>
                <option value="Completed">🎯 Completed</option>
              </select>
            </div>
          </div>

          <!-- LIVE URL + GITHUB URL -->
          <div class="form-row">
            <div class="form-group">
              <label>🌐 Live URL</label>
              <input type="url" id="projLive" placeholder="https://myproject.com">
            </div>
            <div class="form-group">
              <label>⚙️ GitHub URL</label>
              <input type="url" id="projGithub" placeholder="https://github.com/...">
            </div>
          </div>

          <!-- TECH + EMOJI -->
          <div class="form-row">
            <div class="form-group">
              <label>💻 Tech Stack</label>
              <input type="text" id="projTech" placeholder="React, Node.js, MongoDB">
            </div>
            <div class="form-group">
              <label>🎨 Emoji Icon</label>
              <input type="text" id="projEmoji" placeholder="🚀" maxlength="4">
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal('projectModal')">Cancel</button>
          <button class="btn btn-primary" onclick="saveProject()" style="min-width:140px;">💾 Save Project</button>
        </div>
      </div>
    </div>

    <!-- EXPERIENCE MODAL -->
    <div class="modal-overlay" id="expModal">
      <div class="modal">
        <div class="modal-header">
          <h3>ADD EXPERIENCE</h3>
          <button class="modal-close" onclick="closeModal('expModal')">✕</button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="editExpId">
          <div class="form-row">
            <div class="form-group">
              <label>Job Title *</label>
              <input type="text" id="expTitle" placeholder="Senior Developer">
            </div>
            <div class="form-group">
              <label>Company / Organization *</label>
              <input type="text" id="expOrg" placeholder="Company Name">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Year / Period *</label>
              <input type="text" id="expYear" placeholder="2022 – Present">
            </div>
            <div class="form-group">
              <label>Type</label>
              <select id="expType">
                <option value="work">Full Time</option>
                <option value="freelance">Freelance</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea id="expDesc" rows="3" placeholder="What did you do there?"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal('expModal')">Cancel</button>
          <button class="btn btn-primary" onclick="saveExp()">Save Entry</button>
        </div>
      </div>
    </div>
  `;
}

function renderProjectRows(projects) {
  if (projects.length === 0) {
    return '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);font-family:var(--font-mono);">// No projects yet. Click "Add Project" to get started.</td></tr>';
  }
  return projects.map(p => `
    <tr>
      <td style="font-size:1.5rem;">
        ${p.imageUrl
          ? `<img src="${p.imageUrl}" alt="${p.title}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;border:1px solid var(--border);" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span style="display:none;font-size:1.5rem;">${p.emoji || '🚀'}</span>`
          : `<span>${p.emoji || '🚀'}</span>`
        }
      </td>
      <td style="font-weight:600;color:var(--text);">${p.title}</td>
      <td><span style="color:var(--secondary);font-family:var(--font-mono);font-size:0.78rem;">${p.category}</span></td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${(p.tech || '').split(',').slice(0,3).map(t => `<span class="tag">${t.trim()}</span>`).join('')}
        </div>
      </td>
      <td><span class="project-status status-${p.status === 'Live' ? 'live' : 'dev'}">${p.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-sm btn-edit" onclick="editProject('${p.id}')">✏️ Edit</button>
          <button class="btn-sm btn-delete" onclick="deleteProject('${p.id}')">🗑 Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderMessages(messages) {
  if (messages.length === 0) {
    return '<p style="text-align:center;color:var(--text-muted);font-family:var(--font-mono);padding:40px;">// No messages yet.</p>';
  }
  return messages.slice().reverse().map((m, i) => `
    <div style="background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:8px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <div style="font-weight:700;color:var(--text);font-size:1rem;">${m.name}</div>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--primary);">${m.email}</div>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);">
          ${new Date(m.timestamp).toLocaleDateString()}
        </div>
      </div>
      <div style="font-weight:600;color:var(--secondary);margin-bottom:8px;">${m.subject}</div>
      <div style="color:var(--text-dim);font-size:0.92rem;line-height:1.7;">${m.message}</div>
    </div>
  `).join('');
}

function renderAboutForm() {
  const info = JSON.parse(localStorage.getItem('portfolio_about') || '{}');
  return `
    <div class="form-row">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="aName" value="${info.name || 'M. Jasim Waheed'}" placeholder="Your Name">
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" id="aLocation" value="${info.location || 'Pakistan'}" placeholder="City, Country">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="aEmail" value="${info.email || ''}" placeholder="your@email.com">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" id="aPhone" value="${info.phone || ''}" placeholder="+92 xxx xxxxxxx">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>GitHub URL</label>
        <input type="url" id="aGithub" value="${info.github || ''}" placeholder="https://github.com/username">
      </div>
      <div class="form-group">
        <label>LinkedIn URL</label>
        <input type="url" id="aLinkedin" value="${info.linkedin || ''}" placeholder="https://linkedin.com/in/username">
      </div>
    </div>
    <div class="form-group">
      <label>About Text</label>
      <textarea id="aBio" rows="4" placeholder="Write about yourself...">${info.bio || ''}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Years Experience</label>
        <input type="number" id="aExp" value="${info.exp || '3'}" min="0">
      </div>
      <div class="form-group">
        <label>Projects Count</label>
        <input type="number" id="aProjects" value="${info.projectsCount || '20'}" min="0">
      </div>
    </div>
    <button class="btn btn-primary" onclick="saveAbout()">💾 Save Changes</button>
  `;
}

function renderExpList() {
  const exps = JSON.parse(localStorage.getItem('portfolio_exp') || '[]');
  if (exps.length === 0) {
    return '<p style="color:var(--text-muted);font-family:var(--font-mono);text-align:center;padding:30px;">// No experience entries yet.</p>';
  }
  return exps.map(e => `
    <div style="display:flex;align-items:flex-start;gap:16px;padding:16px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;">
      <div style="flex:1;">
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--primary);margin-bottom:4px;">${e.year}</div>
        <div style="font-weight:700;color:var(--text);">${e.title}</div>
        <div style="color:var(--secondary);font-size:0.85rem;">${e.org}</div>
      </div>
      <div class="table-actions">
        <button class="btn-sm btn-delete" onclick="deleteExp('${e.id}')">🗑</button>
      </div>
    </div>
  `).join('');
}

// ---- PANEL SWITCHING ----
function showPanel(id, btn) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const panel = document.getElementById(`panel-${id}`);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ---- MODAL ----
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

function openProjectModal(projectId = null) {
  document.getElementById('editProjectId').value = '';
  document.getElementById('projTitle').value = '';
  document.getElementById('projCat').value = '';
  document.getElementById('projDesc').value = '';
  document.getElementById('projTech').value = '';
  document.getElementById('projEmoji').value = '🚀';
  document.getElementById('projLive').value = '';
  document.getElementById('projGithub').value = '';
  document.getElementById('projImage').value = '';
  document.getElementById('projStatus').value = 'Live';
  document.getElementById('modalTitle').textContent = 'ADD PROJECT';
  document.getElementById('imgPreviewWrap').style.display = 'none';
  document.getElementById('imgPreview').src = '';

  // Live image preview on URL input
  document.getElementById('projImage').oninput = function() {
    const url = this.value.trim();
    const wrap = document.getElementById('imgPreviewWrap');
    const img = document.getElementById('imgPreview');
    if (url) {
      img.src = url;
      img.onload = () => { wrap.style.display = 'block'; };
      img.onerror = () => { wrap.style.display = 'none'; };
    } else {
      wrap.style.display = 'none';
      img.src = '';
    }
  };

  if (projectId) {
    const p = getProjects().find(x => x.id === projectId);
    if (p) {
      document.getElementById('editProjectId').value = p.id;
      document.getElementById('projTitle').value = p.title;
      document.getElementById('projCat').value = p.category;
      document.getElementById('projDesc').value = p.description;
      document.getElementById('projTech').value = p.tech;
      document.getElementById('projEmoji').value = p.emoji || '🚀';
      document.getElementById('projLive').value = p.liveUrl || '';
      document.getElementById('projGithub').value = p.githubUrl || '';
      document.getElementById('projImage').value = p.imageUrl || '';
      document.getElementById('projStatus').value = p.status;
      document.getElementById('modalTitle').textContent = 'EDIT PROJECT';
      // Show existing image preview
      if (p.imageUrl) {
        const img = document.getElementById('imgPreview');
        img.src = p.imageUrl;
        img.onload = () => { document.getElementById('imgPreviewWrap').style.display = 'block'; };
      }
    }
  }
  openModal('projectModal');
}

function saveProject() {
  const title = document.getElementById('projTitle').value.trim();
  const category = document.getElementById('projCat').value.trim();
  const description = document.getElementById('projDesc').value.trim();

  if (!title || !category || !description) {
    alert('Please fill in required fields (Title, Category, Description)');
    return;
  }

  const projects = getProjects();
  const editId = document.getElementById('editProjectId').value;

  const projectData = {
    id: editId || generateId(),
    title,
    category,
    description,
    tech: document.getElementById('projTech').value,
    emoji: document.getElementById('projEmoji').value || '🚀',
    imageUrl: document.getElementById('projImage').value.trim(),
    liveUrl: document.getElementById('projLive').value,
    githubUrl: document.getElementById('projGithub').value,
    status: document.getElementById('projStatus').value,
    createdAt: editId ? (projects.find(p => p.id === editId)?.createdAt || Date.now()) : Date.now()
  };

  if (editId) {
    const idx = projects.findIndex(p => p.id === editId);
    if (idx !== -1) projects[idx] = projectData;
  } else {
    projects.push(projectData);
  }

  saveProjects(projects);
  closeModal('projectModal');
  document.getElementById('projectsTableBody').innerHTML = renderProjectRows(getProjects());
  showNotification('✅ Project saved successfully!');
  renderAdmin(); // refresh
  showPanel('projects', null);
}

function editProject(id) { openProjectModal(id); }

function deleteProject(id) {
  if (!confirm('Delete this project? This cannot be undone.')) return;
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
  document.getElementById('projectsTableBody').innerHTML = renderProjectRows(getProjects());
  showNotification('🗑 Project deleted.');
}

function openExpModal() { openModal('expModal'); }

function saveExp() {
  const title = document.getElementById('expTitle').value.trim();
  const org = document.getElementById('expOrg').value.trim();
  const year = document.getElementById('expYear').value.trim();

  if (!title || !org || !year) { alert('Fill required fields.'); return; }

  const exps = JSON.parse(localStorage.getItem('portfolio_exp') || '[]');
  exps.push({
    id: generateId(), title, org, year,
    type: document.getElementById('expType').value,
    description: document.getElementById('expDesc').value
  });
  localStorage.setItem('portfolio_exp', JSON.stringify(exps));
  closeModal('expModal');
  document.getElementById('expList').innerHTML = renderExpList();
  showNotification('✅ Experience entry saved!');
}

function deleteExp(id) {
  const exps = JSON.parse(localStorage.getItem('portfolio_exp') || '[]').filter(e => e.id !== id);
  localStorage.setItem('portfolio_exp', JSON.stringify(exps));
  document.getElementById('expList').innerHTML = renderExpList();
  showNotification('🗑 Entry deleted.');
}

function saveAbout() {
  const data = {
    name: document.getElementById('aName').value,
    location: document.getElementById('aLocation').value,
    email: document.getElementById('aEmail').value,
    phone: document.getElementById('aPhone').value,
    github: document.getElementById('aGithub').value,
    linkedin: document.getElementById('aLinkedin').value,
    bio: document.getElementById('aBio').value,
    exp: document.getElementById('aExp').value,
    projectsCount: document.getElementById('aProjects').value
  };
  localStorage.setItem('portfolio_about', JSON.stringify(data));
  showNotification('✅ About info saved!');
}

function clearMessages() {
  if (!confirm('Clear all messages?')) return;
  localStorage.removeItem('portfolio_messages');
  showNotification('🗑 Messages cleared.');
  setTimeout(() => renderAdmin(), 500);
}

function changePassword() {
  const n = document.getElementById('newPass').value;
  const c = document.getElementById('confirmPass').value;
  if (!n || n !== c) { alert('Passwords do not match.'); return; }
  // Note: In production, store hashed password on backend
  showNotification('✅ Password updated! Update ADMIN_PASSWORD in admin.js');
}

function exportData() {
  const data = {
    projects: getProjects(),
    messages: getMessages(),
    about: JSON.parse(localStorage.getItem('portfolio_about') || '{}'),
    exp: JSON.parse(localStorage.getItem('portfolio_exp') || '[]'),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `jasim-portfolio-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showNotification('📤 Data exported!');
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.projects) saveProjects(data.projects);
      if (data.messages) localStorage.setItem('portfolio_messages', JSON.stringify(data.messages));
      if (data.about) localStorage.setItem('portfolio_about', JSON.stringify(data.about));
      if (data.exp) localStorage.setItem('portfolio_exp', JSON.stringify(data.exp));
      showNotification('✅ Data imported successfully!');
      setTimeout(() => renderAdmin(), 800);
    } catch { alert('Invalid JSON file.'); }
  };
  reader.readAsText(file);
}

function showNotification(msg) {
  let n = document.getElementById('adminNotif');
  if (!n) {
    n = document.createElement('div');
    n.id = 'adminNotif';
    n.className = 'notification';
    document.body.appendChild(n);
  }
  n.textContent = msg;
  n.className = 'notification success show';
  setTimeout(() => n.classList.remove('show'), 3500);
}

// Click outside modal to close
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    renderAdmin();
  } else {
    renderLogin();
  }
});