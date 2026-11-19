// ═══════════════════════════════════════════════════
// OSCILLOSCOPE LAB — Grade 9 → 12
// Google Apps Script — dedicated results sheet + optional AI route
// Teacher: Ahmad Ghozlan | aghozlan.github.io/oscilloscopelab.html
// ═══════════════════════════════════════════════════
// DEPLOY (3 steps):
//  1. Create a new Google Sheet → Extensions → Apps Script → paste this file.
//  2. Deploy → New deployment → Web app · Execute as: Me · Who has access: Anyone.
//  3. Copy the /exec URL → paste it into GOOGLE_SCRIPT_URL in oscilloscopelab.html.
// (Optional) To serve the Scope Coach from this script too: Project Settings →
//  Script properties → add GROQ_API_KEY (and optionally GROQ_MODEL). The key never
//  appears in the HTML. Once this script's URL is in the HTML, the coach uses it automatically.

const SHEET_NAME   = 'Responses';
const TIMEZONE     = 'Asia/Beirut';
const PHOTO_FOLDER = 'OscilloscopeLab — drawings';
const HEADER_COLOR = '#059669';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'ai') return json(aiReply(data));
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // drawing photo → Drive, store the link instead of 1 MB of base64
    if (data.imageBase64 && String(data.imageBase64).indexOf('data:image') === 0) {
      data.drawingLink = savePhoto(data);
    }
    delete data.imageBase64;
    data.receivedAt = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');

    // dynamic headers: any new payload key becomes a new column
    let headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    Object.keys(data).forEach(k => { if (headers.indexOf(k) === -1) headers.push(k); });
    const hr = sheet.getRange(1, 1, 1, headers.length);
    hr.setValues([headers]).setBackground(HEADER_COLOR).setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
    const row = headers.map(h => {
      const v = data[h];
      if (v === undefined || v === null) return '';
      const s = typeof v === 'object' ? JSON.stringify(v) : v;
      return typeof s === 'string' && s.length > 49000 ? s.slice(0, 49000) : s;
    });
    sheet.appendRow(row);
    return json({ status: 'ok' });
  } catch (err) {
    return json({ status: 'error', msg: err.message });
  }
}

function doGet() { return json({ status: 'ok', lab: 'OscilloscopeLab' }); }

function savePhoto(data) {
  const it = DriveApp.getFoldersByName(PHOTO_FOLDER);
  const folder = it.hasNext() ? it.next() : DriveApp.createFolder(PHOTO_FOLDER);
  const b64 = data.imageBase64.split(',')[1];
  const name = `${data.section || 'NA'}_${(data.studentName || 'student').replace(/[\\/:*?"<>|]/g, '')}_${Date.now()}.jpg`;
  const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(b64), 'image/jpeg', name));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function aiReply(data) {
  const key = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  if (!key) return { error: 'AI key not configured on the server.' };
  const messages = [{ role: 'system', content: String(data.system || '').slice(0, 6000) }]
    .concat((data.messages || []).slice(-8).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content).slice(0, 1500) })));
  const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + key },
    // model can be changed without redeploying: Script property GROQ_MODEL
    payload: JSON.stringify({ model: PropertiesService.getScriptProperties().getProperty('GROQ_MODEL') || 'llama-3.3-70b-versatile', messages: messages, temperature: 0.5, max_tokens: 300 })
  });
  const j = JSON.parse(res.getContentText());
  return { text: j.choices && j.choices[0] ? j.choices[0].message.content : (j.error ? j.error.message : '') };
}

function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
