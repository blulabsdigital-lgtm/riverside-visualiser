/* Riverside Bathroom Visualiser v2 (Blulabs). Loaded with defer and mounted only when a visitor scrolls near it,
   so it adds nothing to the page's first load. No fonts, no trackers, no requests until a customer uses it. */
(function () {
  var CSS = "/* Layout: one calm card that walks the customer through four steps, then two designs (A and B) with a before/after slider. */\n.rvz{\n  --rvz-ink:#322F31; --rvz-body:#626D7A; --rvz-orange:#EB6832; --rvz-orange-deep:#C2501F;\n  --rvz-char:#1E1C1D; --rvz-line:#E7E3E0; --rvz-wash:#F8F6F4; --rvz-white:#FFFFFF;\n  --rvz-accent-hi:#F07A41; --rvz-on-accent:#FFFFFF; --rvz-panel:#1E1C1D; --rvz-hover:#FDF3EE; --rvz-dash:#D7D1CC; --rvz-glow:rgba(235,104,50,.28);\n  --rvz-err:#B3261E; --rvz-ok:#2E7A57;\n  font-family:Thicccboi,\"Plus Jakarta Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;\n  color:var(--rvz-body); font-size:17px; line-height:1.55; box-sizing:border-box;\n  max-width:1120px; margin:0 auto; padding:56px 20px;\n}\n.rvz *,.rvz *::before,.rvz *::after{box-sizing:border-box}\n.rvz [hidden]{display:none!important}\n.rvz h2{font-size:clamp(28px,4.4vw,42px);line-height:1.1;font-weight:700;color:var(--rvz-ink);margin:0 0 12px;text-wrap:balance}\n.rvz h3{font-size:clamp(22px,3vw,28px);line-height:1.2;font-weight:700;color:var(--rvz-ink);margin:0;text-wrap:balance}\n.rvz p{margin:0}\n.rvz-head{text-align:center;max-width:660px;margin:0 auto 28px}\n.rvz-eyebrow{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--rvz-orange-deep);margin-bottom:12px}\n.rvz-small{font-size:14px;color:var(--rvz-body)}\n\n/* Progress */\n.rvz-progress{list-style:none;margin:0 auto 26px;padding:0;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;counter-reset:rvzstep}\n.rvz-progress li{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#8C8681;padding:6px 12px 6px 6px;border-radius:999px;background:var(--rvz-wash)}\n.rvz-progress li::before{counter-increment:rvzstep;content:counter(rvzstep);width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#E7E3E0;color:#6B6561;font-size:12px}\n.rvz-progress li.on{color:var(--rvz-ink);background:#FFFFFF;box-shadow:0 0 0 1.5px var(--rvz-orange) inset}\n.rvz-progress li.on::before{background:var(--rvz-orange);color:#FFFFFF}\n.rvz-progress li.done{color:var(--rvz-ink)}\n.rvz-progress li.done::before{background:var(--rvz-char);color:#FFFFFF}\n\n.rvz-card{background:var(--rvz-white);border:1px solid var(--rvz-line);border-radius:22px;padding:clamp(20px,4vw,40px);display:flex;flex-direction:column;gap:22px}\n.rvz-step-head{display:flex;flex-direction:column;gap:6px}\n.rvz-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}\n.rvz-row.end{justify-content:space-between}\n\n/* Buttons */\n.rvz-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border:0;cursor:pointer;text-decoration:none;\n  font:inherit;font-weight:700;font-size:16px;line-height:1.1;padding:16px 26px;border-radius:12px;\n  background:linear-gradient(135deg,var(--rvz-accent-hi),var(--rvz-orange-deep));color:var(--rvz-on-accent);transition:transform .15s,box-shadow .15s,filter .15s}\n.rvz-btn:hover{filter:brightness(1.05);box-shadow:0 8px 22px var(--rvz-glow)}\n.rvz-btn:active{transform:translateY(1px)}\n.rvz-btn:disabled{opacity:.5;cursor:default;box-shadow:none;filter:none}\n.rvz-btn.ghost{background:transparent;color:var(--rvz-ink);border:1.5px solid var(--rvz-line)}\n.rvz-btn.ghost:hover{border-color:var(--rvz-ink);box-shadow:none;filter:none}\n.rvz-btn.wa{background:#1F8F55}\n.rvz-btn.wa:hover{box-shadow:0 8px 22px rgba(31,143,85,.3)}\n.rvz-btn svg{width:20px;height:20px;fill:currentColor;flex:none}\n.rvz-link{background:none;border:0;padding:4px 2px;font:inherit;font-weight:700;font-size:15px;color:var(--rvz-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer}\n.rvz-btn:focus-visible,.rvz-link:focus-visible,.rvz-type:focus-visible,.rvz-ab button:focus-visible,.rvz-sets button:focus-visible,.rvz-design:focus-visible,.rvz-drop:focus-within,.rvz-field input:focus-visible{outline:3px solid var(--rvz-glow);outline-offset:3px}\n\n/* Step 1: bathroom type */\n.rvz-types{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}\n.rvz-type{font:inherit;text-align:left;cursor:pointer;background:var(--rvz-wash);border:2px solid transparent;border-radius:18px;padding:20px 18px;display:flex;flex-direction:column;gap:10px;color:inherit;transition:border-color .15s,background .15s,box-shadow .15s}\n.rvz-type:hover{border-color:#D9D2CC;background:#FFFFFF}\n.rvz-type[aria-checked=\"true\"]{border-color:var(--rvz-orange);background:#FFFFFF;box-shadow:0 10px 26px var(--rvz-glow)}\n.rvz-type svg{width:34px;height:34px;stroke:var(--rvz-orange-deep);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}\n.rvz-type b{font-size:18px;color:var(--rvz-ink)}\n.rvz-type span{font-size:14px;line-height:1.45}\n\n/* Step 2: details */\n.rvz-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}\n.rvz-field{display:flex;flex-direction:column;gap:7px;min-width:0}\n.rvz-field label{font-size:14px;font-weight:700;color:var(--rvz-ink)}\n.rvz-field input{font:inherit;font-size:16px;color:var(--rvz-ink);background:var(--rvz-wash);border:1.5px solid var(--rvz-line);border-radius:12px;padding:14px 16px;width:100%}\n.rvz-field input:focus{border-color:var(--rvz-orange);background:#FFFFFF;outline:none}\n.rvz-field input[aria-invalid=\"true\"]{border-color:var(--rvz-err)}\n.rvz-field .rvz-err{font-size:13px;color:var(--rvz-err);font-weight:600;min-height:1em}\n\n/* Step 3: upload */\n.rvz-drop{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;\n  min-height:300px;padding:32px 20px;border:2px dashed var(--rvz-dash);border-radius:20px;background:var(--rvz-wash);cursor:pointer;transition:border-color .15s,background .15s}\n.rvz-drop.over,.rvz-drop:hover{border-color:var(--rvz-orange);background:var(--rvz-hover)}\n.rvz-drop input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}\n.rvz-drop-icon{width:56px;height:56px;border-radius:14px;background:var(--rvz-panel);display:grid;place-items:center}\n.rvz-drop-icon svg{width:28px;height:28px;stroke:var(--rvz-orange);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n.rvz-drop strong{display:block;font-size:22px;color:var(--rvz-ink);font-weight:700}\n.rvz-alert{font-size:15px;font-weight:600;color:var(--rvz-err);text-align:center}\n\n/* Step 4: designs */\n.rvz-toolbar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px}\n.rvz-ab{display:inline-flex;padding:4px;border-radius:999px;background:var(--rvz-wash);border:1px solid var(--rvz-line)}\n.rvz-ab button{font:inherit;font-size:15px;font-weight:700;border:0;background:none;color:var(--rvz-ink);padding:10px 18px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:8px}\n.rvz-ab button b{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#E7E3E0;color:var(--rvz-ink);font-size:13px}\n.rvz-ab button[aria-pressed=\"true\"]{background:var(--rvz-char);color:#FFFFFF}\n.rvz-ab button[aria-pressed=\"true\"] b{background:var(--rvz-orange);color:#FFFFFF}\n.rvz-sets{display:flex;gap:6px;flex-wrap:wrap;align-items:center}\n.rvz-sets span{font-size:13px;font-weight:700;color:var(--rvz-body);margin-right:2px}\n.rvz-sets button{font:inherit;font-size:13px;font-weight:700;border:1.5px solid var(--rvz-line);background:#FFFFFF;color:var(--rvz-ink);padding:6px 12px;border-radius:999px;cursor:pointer}\n.rvz-sets button[aria-pressed=\"true\"]{border-color:var(--rvz-ink);background:var(--rvz-ink);color:#FFFFFF}\n\n.rvz-viewer{position:relative;border-radius:20px;overflow:hidden;background:var(--rvz-char);user-select:none;touch-action:pan-y;\n  aspect-ratio:var(--w,4)/var(--h,3);margin:0 auto;width:min(100%, calc(70vh * var(--w,4) / var(--h,3)));box-shadow:0 18px 50px rgba(30,28,29,.18)}\n.rvz-viewer img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}\n.rvz-before{clip-path:inset(0 calc(100% - var(--pos,40%)) 0 0)}\n.rvz-line{position:absolute;top:0;bottom:0;left:var(--pos,40%);width:3px;margin-left:-1.5px;background:#FFFFFF;box-shadow:0 0 12px rgba(0,0,0,.35);pointer-events:none}\n.rvz-knob{position:absolute;top:50%;left:var(--pos,40%);width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#FFFFFF;display:grid;place-items:center;box-shadow:0 4px 16px rgba(0,0,0,.3);pointer-events:none}\n.rvz-knob svg{width:22px;height:22px;stroke:#322F31;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}\n.rvz-range{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;z-index:3}\n.rvz-tag{position:absolute;bottom:14px;z-index:2;font-size:13px;font-weight:700;padding:7px 12px;border-radius:999px;background:rgba(30,28,29,.78);color:#FFFFFF;pointer-events:none}\n.rvz-tag.l{left:14px}.rvz-tag.r{right:14px;background:var(--rvz-orange);color:#FFFFFF}\n.rvz-pending .rvz-line,.rvz-pending .rvz-knob,.rvz-pending .rvz-range,.rvz-pending .rvz-tag.r{display:none}\n.rvz-pending .rvz-before{clip-path:none}\n.rvz-busy{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;background:rgba(30,28,29,.62);color:#FFFFFF;padding:20px}\n.rvz-busy strong{font-size:20px;font-weight:700;color:#FFFFFF}\n.rvz-busy .rvz-small{color:#E6E1DD}\n.rvz-bar{width:min(260px,70%);height:5px;border-radius:5px;background:rgba(255,255,255,.25);overflow:hidden}\n.rvz-bar i{display:block;height:100%;width:40%;border-radius:5px;background:var(--rvz-orange);animation:rvz-slide 1.3s ease-in-out infinite}\n@keyframes rvz-slide{0%{transform:translateX(-110%)}100%{transform:translateX(280%)}}\n\n.rvz-designs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.rvz-design{position:relative;text-align:left;cursor:pointer;background:var(--rvz-white);border:2px solid var(--rvz-line);border-radius:18px;padding:16px;display:grid;grid-template-columns:96px minmax(0,1fr);gap:14px;align-items:start;transition:border-color .15s,box-shadow .15s}\n.rvz-design:hover{border-color:#CFC8C2}\n.rvz-design.sel{border-color:var(--rvz-orange);box-shadow:0 10px 28px var(--rvz-glow)}\n.rvz-thumb{width:96px;aspect-ratio:4/3;border-radius:10px;background:var(--rvz-wash);object-fit:cover;display:block}\n.rvz-design-body{display:flex;flex-direction:column;gap:4px;min-width:0}\n.rvz-design-name{font-size:17px;font-weight:700;color:var(--rvz-ink)}\n.rvz-design-desc{font-size:14px;line-height:1.4}\n.rvz-price{font-size:19px;font-weight:700;color:var(--rvz-orange-deep);font-variant-numeric:tabular-nums;margin-top:4px}\n.rvz-design .rvz-btn{grid-column:1 / -1;width:100%;padding:14px 18px}\n.rvz-dot{position:absolute;top:14px;right:14px;width:12px;height:12px;border-radius:50%;background:#D9D3CE}\n.rvz-dot.ready{background:#3FA66B}\n.rvz-dot.loading{background:transparent;border:2px solid var(--rvz-orange);border-top-color:transparent;animation:rvz-spin .8s linear infinite}\n.rvz-dot.error{background:#C9402B}\n@keyframes rvz-spin{to{transform:rotate(360deg)}}\n\n.rvz-include{border-top:1px solid var(--rvz-line);padding-top:16px}\n.rvz-include summary{cursor:pointer;font-weight:700;color:var(--rvz-ink);font-size:16px}\n.rvz-include p{margin-top:10px;max-width:72ch;font-size:15.5px;line-height:1.65}\n.rvz-note{font-size:13.5px;text-align:center}\n\n/* Step 5 + 6 */\n.rvz-recap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:24px;align-items:start}\n.rvz-recap dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:10px 18px;font-size:16px}\n.rvz-recap dt{color:var(--rvz-body)}\n.rvz-recap dd{margin:0;color:var(--rvz-ink);font-weight:700;overflow-wrap:anywhere}\n.rvz-recap img{width:100%;border-radius:16px;display:block;background:var(--rvz-wash)}\n.rvz-thanks{align-items:center;text-align:center;padding-block:clamp(36px,6vw,64px)}\n.rvz-thanks .rvz-tick{width:64px;height:64px;border-radius:50%;background:var(--rvz-orange);display:grid;place-items:center}\n.rvz-thanks .rvz-tick svg{width:30px;height:30px;stroke:#FFFFFF;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}\n.rvz-thanks p.lead{max-width:60ch;font-size:18px;line-height:1.65;color:var(--rvz-ink)}\n\n@media (max-width:860px){\n  .rvz-types{grid-template-columns:repeat(2,minmax(0,1fr))}\n  .rvz-fields{grid-template-columns:1fr}\n  .rvz-designs{grid-template-columns:1fr}\n  .rvz-recap{grid-template-columns:1fr}\n}\n@media (max-width:560px){\n  .rvz{padding:36px 16px}\n  .rvz-progress li{font-size:0;padding:6px}\n  .rvz-progress li.on{font-size:13px;padding-right:12px}\n  .rvz-viewer{width:min(100%, calc(62vh * var(--w,4) / var(--h,3)))}\n  .rvz-ab{width:100%}.rvz-ab button{flex:1;justify-content:center;padding:10px 8px}\n  .rvz-row .rvz-btn{flex:1 1 100%}\n}\n@media (prefers-reduced-motion:reduce){.rvz-bar i,.rvz-dot.loading{animation:none}.rvz-btn,.rvz-type,.rvz-design{transition:none}}";
  var HTML = "<ol class=\"rvz-progress\" id=\"rvz-progress\" aria-label=\"Steps\">\n    <li data-for=\"type\">Your bathroom</li>\n    <li data-for=\"details\">Your details</li>\n    <li data-for=\"photo\">Your photo</li>\n    <li data-for=\"designs\">Your designs</li>\n  </ol>\n\n  <!-- Step 1 -->\n  <div class=\"rvz-card\" data-step=\"type\">\n    <div class=\"rvz-step-head\"><h3>What kind of bathroom is it?</h3><p>This sets the style and the guide price for your designs.</p></div>\n    <div class=\"rvz-types\" id=\"rvz-types\" role=\"radiogroup\" aria-label=\"Bathroom type\"></div>\n  </div>\n\n  <!-- Step 2 -->\n  <form class=\"rvz-card\" data-step=\"details\" id=\"rvz-form\" novalidate hidden>\n    <div class=\"rvz-step-head\"><h3>Where should we send your designs?</h3><p>Alex uses these to get back to you about your bathroom.</p></div>\n    <div class=\"rvz-fields\">\n      <div class=\"rvz-field\"><label for=\"rvz-name\">Your name</label><input id=\"rvz-name\" name=\"name\" autocomplete=\"name\" maxlength=\"80\"><span class=\"rvz-err\" id=\"rvz-name-err\"></span></div>\n      <div class=\"rvz-field\"><label for=\"rvz-phone\">Mobile number</label><input id=\"rvz-phone\" name=\"phone\" type=\"tel\" autocomplete=\"tel\" inputmode=\"tel\" maxlength=\"20\"><span class=\"rvz-err\" id=\"rvz-phone-err\"></span></div>\n      <div class=\"rvz-field\"><label for=\"rvz-postcode\">Postcode</label><input id=\"rvz-postcode\" name=\"postcode\" autocomplete=\"postal-code\" maxlength=\"10\" style=\"text-transform:uppercase\"><span class=\"rvz-err\" id=\"rvz-postcode-err\"></span></div>\n    </div>\n    <div class=\"rvz-row end\">\n      <button type=\"button\" class=\"rvz-link\" data-back=\"type\">Back</button>\n      <button type=\"submit\" class=\"rvz-btn\">Continue</button>\n    </div>\n  </form>\n\n  <!-- Step 3 -->\n  <div class=\"rvz-card\" data-step=\"photo\" hidden>\n    <label class=\"rvz-drop\" id=\"rvz-drop\" for=\"rvz-file\">\n      <input type=\"file\" id=\"rvz-file\" accept=\"image/*\">\n      <span class=\"rvz-drop-icon\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.1-1.6A1 1 0 0 1 9.6 4h4.8a1 1 0 0 1 .8.4L16.3 6h1.2A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z\"/><circle cx=\"12\" cy=\"12.5\" r=\"3.4\"/></svg></span>\n      <span><strong>Add a photo of your bathroom</strong><span class=\"rvz-small\">Stand in the doorway so the whole room is in the shot.</span></span>\n      <span class=\"rvz-btn\" aria-hidden=\"true\">Choose photo</span>\n    </label>\n    <p class=\"rvz-alert\" id=\"rvz-photo-err\" role=\"alert\" hidden></p>\n    <div class=\"rvz-row\"><button type=\"button\" class=\"rvz-link\" data-back=\"details\">Back</button></div>\n  </div>\n\n  <!-- Step 4 -->\n  <div class=\"rvz-card\" data-step=\"designs\" hidden>\n    <div class=\"rvz-toolbar\">\n      <div class=\"rvz-ab\" role=\"group\" aria-label=\"Choose a design\">\n        <button type=\"button\" data-v=\"A\" aria-pressed=\"true\"><b>A</b>Your layout</button>\n        <button type=\"button\" data-v=\"B\" aria-pressed=\"false\"><b>B</b>Redesigned</button>\n      </div>\n      <div class=\"rvz-sets\" id=\"rvz-sets\" hidden></div>\n    </div>\n\n    <div class=\"rvz-viewer\" id=\"rvz-viewer\">\n      <img id=\"rvz-after\" alt=\"Your bathroom with the new design\">\n      <img id=\"rvz-before\" class=\"rvz-before\" alt=\"Your bathroom today\">\n      <span class=\"rvz-line\" aria-hidden=\"true\"></span>\n      <span class=\"rvz-knob\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path d=\"M9 6l-6 6 6 6M15 6l6 6-6 6\"/></svg></span>\n      <input class=\"rvz-range\" id=\"rvz-range\" type=\"range\" min=\"0\" max=\"100\" value=\"40\" aria-label=\"Slide to compare your bathroom today with the new design\">\n      <span class=\"rvz-tag l\">Today</span>\n      <span class=\"rvz-tag r\" id=\"rvz-tag-r\">Design A</span>\n      <div class=\"rvz-busy\" id=\"rvz-busy\" role=\"status\">\n        <strong id=\"rvz-busy-title\">Designing your bathroom</strong>\n        <div class=\"rvz-bar\"><i></i></div>\n        <span class=\"rvz-small\">Both designs are being made at once. This takes up to a minute.</span>\n      </div>\n      <div class=\"rvz-busy\" id=\"rvz-fail\" hidden>\n        <strong>We couldn't create this design</strong>\n        <span class=\"rvz-small\">Please try again. If it keeps happening, message us and we'll talk you through the options.</span>\n        <button type=\"button\" class=\"rvz-btn\" id=\"rvz-retry\">Try again</button>\n      </div>\n    </div>\n\n    <div class=\"rvz-designs\" id=\"rvz-designs\"></div>\n\n    <details class=\"rvz-include\" id=\"rvz-include\">\n      <summary id=\"rvz-include-title\">What's included</summary>\n      <p id=\"rvz-include-text\"></p>\n    </details>\n\n    <div class=\"rvz-row end\">\n      <button type=\"button\" class=\"rvz-link\" id=\"rvz-newphoto\">Use a different photo</button>\n      <button type=\"button\" class=\"rvz-btn ghost\" id=\"rvz-more\">See two more designs</button>\n    </div>\n    <p class=\"rvz-note\">Computer-generated illustration of the style and finish. Layout, products and your fixed price are agreed after your consultation and survey.</p>\n  </div>\n\n  <!-- Step 5 -->\n  <div class=\"rvz-card\" data-step=\"submit\" hidden>\n    <div class=\"rvz-step-head\"><h3>Book your consultation</h3><p>A quick call with Alex about your project, before anyone books a survey.</p></div>\n    <div class=\"rvz-recap\">\n      <dl id=\"rvz-recap\"></dl>\n      <img id=\"rvz-recap-img\" alt=\"The design you chose\">\n    </div>\n    <p>Your photo and every design you've created go to Alex with your enquiry.</p>\n    <div class=\"rvz-row end\">\n      <button type=\"button\" class=\"rvz-link\" data-back=\"designs\">Back to my designs</button>\n      <a class=\"rvz-btn wa\" id=\"rvz-send\" href=\"#\" target=\"_blank\" rel=\"noopener\">\n        <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 15l-.3-.18-3.1.8.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3.1 3.9c-.2 0-.5.07-.77.36-.26.3-1 1-1 2.4s1.03 2.8 1.17 3c.15.2 2 3.2 4.9 4.36 2.4.95 2.9.76 3.4.7.52-.05 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.56-.34-.3-.15-1.7-.84-1.97-.94-.27-.1-.46-.15-.66.15-.2.3-.76.94-.93 1.13-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.37-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5z\"/></svg>\n        Submit your enquiry\n      </a>\n    </div>\n  </div>\n\n  <!-- Step 6 -->\n  <div class=\"rvz-card rvz-thanks\" data-step=\"thanks\" hidden>\n    <span class=\"rvz-tick\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5l4.5 4.5L19 7.5\"/></svg></span>\n    <h3>Thank you for your interest in our bathroom renovation services</h3>\n    <p class=\"lead\">We have received your enquiry. Alex or a member of the team will review your details and contact you within 24 hours to discuss your project, answer any questions and guide you through the next steps before you receive a fixed quotation. We look forward to helping you create your dream bathroom.</p>\n    <p class=\"rvz-small\" id=\"rvz-thanks-note\">If WhatsApp didn't open, message us on <b>07860 922906</b>.</p>\n    <button type=\"button\" class=\"rvz-link\" id=\"rvz-restart\">Back to my designs</button>\n  </div>";
  function run() {
(function () {
  /* ---- Settings. Prices and wording from Alex's workshop, 9 Oct 2026. "included" text is a draft for Alex to approve. ---- */
  var CFG = {
    endpoint: "https://ueaqhcspcsiojhxmljfs.supabase.co/functions/v1/visualise",
    publicKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYXFoY3NwY3Npb2poeG1samZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMDE3MDksImV4cCI6MjEwNjc3NzcwOX0.KjvokuNh_OephhsXjWdugKxdH4fHQ2mEds10qg4eWSY",
    whatsapp: "447860922906",
    enquiryPage: "https://blulabsdigital-lgtm.github.io/riverside-visualiser/enquiry.html",
    gen: { size: "1K", think: "minimal" },
    maxSets: 3,
    styles: ["light-marble", "warm-stone", "green-feature", "teal-herringbone", "charcoal-modern", "blue-grey-marble", "sage-calm", "concrete-oak", "terracotta-warm", "monochrome"],
    versions: {
      A: { name: "Design A", short: "Your layout", desc: "Your current layout, rebuilt with a premium finish." },
      B: { name: "Design B", short: "Redesigned", desc: "A new layout for your room, with a premium finish." }
    },
    process: "Every Riverside bathroom is a complete, project-managed renovation, from the first visit to the final clean. We start with a design consultation and a site survey, then give you a fixed quotation. Once you go ahead we handle everything: careful strip-out and waste removal, first-fix plumbing and electrics, boarding and full waterproofing of wet areas, and expert tiling. Your sanitaryware, furniture, taps, lighting and fittings are installed and tested, followed by a full clean and a walkthrough handover. One point of contact keeps you updated throughout, so you're never left chasing.",
    types: [
      { key: "cloakroom", name: "Cloakroom", hint: "A downstairs WC or small cloakroom", price: "", lead: "A compact room finished to the same standard as our main bathrooms, with smart, space-saving fittings and clever storage.",
        icon: '<path d="M8 4h8v5H8z"/><path d="M7 9h10l-1.5 6h-7z"/><path d="M10 15v5h4v-5"/>' },
      { key: "ensuite", name: "En-suite", hint: "A shower room off a bedroom", price: "£12,000 – £15,000", lead: "An en-suite designed around a great shower, walk-in or enclosed, with premium screens, tiling and fittings.",
        icon: '<path d="M6 20V8a4 4 0 0 1 8 0"/><path d="M11 8h6"/><path d="M13 11v1M16 11v1M14.5 14v1M11.5 14v1M17.5 14v1"/><path d="M4 20h16"/>' },
      { key: "family", name: "Family bathroom", hint: "The main bathroom, usually with a bath", price: "£14,000 – £17,000", lead: "A hard-working family bathroom with a bath, plenty of storage and finishes made to last.",
        icon: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M7 19l-1 2M17 19l1 2"/>' },
      { key: "bespoke", name: "Bespoke", hint: "A high-end, fully designed bathroom", price: "£20,000 – £30,000", lead: "A fully designed bathroom with premium materials, statement features and every detail chosen with you.",
        icon: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>' }
    ]
  };

  var root = document.getElementById("rvz");
  if (!root || root.getAttribute("data-ready")) return;
  root.setAttribute("data-ready", "1");
  var $ = function (id) { return document.getElementById(id); };
  var steps = Array.prototype.slice.call(root.querySelectorAll("[data-step]"));
  var els = { types: $("rvz-types"), form: $("rvz-form"), name: $("rvz-name"), phone: $("rvz-phone"), postcode: $("rvz-postcode"),
    drop: $("rvz-drop"), file: $("rvz-file"), photoErr: $("rvz-photo-err"), viewer: $("rvz-viewer"), before: $("rvz-before"), after: $("rvz-after"),
    range: $("rvz-range"), tagR: $("rvz-tag-r"), busy: $("rvz-busy"), busyTitle: $("rvz-busy-title"), fail: $("rvz-fail"), retry: $("rvz-retry"),
    designs: $("rvz-designs"), sets: $("rvz-sets"), more: $("rvz-more"), newphoto: $("rvz-newphoto"), includeTitle: $("rvz-include-title"),
    includeText: $("rvz-include-text"), recap: $("rvz-recap"), recapImg: $("rvz-recap-img"), send: $("rvz-send"), restart: $("rvz-restart") };

  var state = { type: null, details: {}, sid: null, orig: null, runs: [], cur: { run: 1, v: "A" }, used: [], ctrl: null, gen: 0, chosen: null };

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach(function (_, i) { b[i] = Math.random() * 256 | 0; });
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = Array.prototype.map.call(b, function (x) { return (x + 256).toString(16).slice(1); }).join("");
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20);
  }
  function typeBy(k) { for (var i = 0; i < CFG.types.length; i++) if (CFG.types[i].key === k) return CFG.types[i]; return CFG.types[0]; }
  function priceText(t) { return t.price || "Priced at your consultation"; }

  /* ---------- steps ---------- */
  var order = ["type", "details", "photo", "designs", "submit", "thanks"];
  function go(name, noScroll) {
    steps.forEach(function (s) { s.hidden = s.getAttribute("data-step") !== name; });
    var idx = order.indexOf(name);
    Array.prototype.forEach.call(root.querySelectorAll(".rvz-progress li"), function (li) {
      var i = order.indexOf(li.getAttribute("data-for"));
      li.classList.toggle("on", i === Math.min(idx, 3));
      li.classList.toggle("done", i < Math.min(idx, 3) || idx > 3);
    });
    if (!noScroll) try { root.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
  }
  root.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-back]"); if (b) go(b.getAttribute("data-back")); });

  /* ---------- step 1: type ---------- */
  CFG.types.forEach(function (t, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "rvz-type"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false"); b.setAttribute("data-key", t.key);
    b.setAttribute("tabindex", i === 0 ? "0" : "-1");
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + t.icon + '</svg><b></b><span></span>';
    b.querySelector("b").textContent = t.name; b.querySelector("span").textContent = t.hint;
    b.addEventListener("click", function () { pickType(t.key); go("details"); setTimeout(function () { try { els.name.focus({ preventScroll: true }); } catch (e) {} }, 350); });
    b.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % CFG.types.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i + CFG.types.length - 1) % CFG.types.length;
      if (n !== null) { e.preventDefault(); var nb = els.types.children[n]; nb.focus(); }
    });
    els.types.appendChild(b);
  });
  function pickType(k) {
    state.type = k;
    Array.prototype.forEach.call(els.types.children, function (b) { var on = b.getAttribute("data-key") === k; b.setAttribute("aria-checked", String(on)); b.setAttribute("tabindex", on ? "0" : "-1"); });
    var t = typeBy(k);
    els.includeTitle.textContent = "What's included in a " + t.name.toLowerCase() + " renovation";
    els.includeText.textContent = t.lead + " " + CFG.process;
    paintDesigns();
  }

  /* ---------- step 2: details ---------- */
  function setErr(input, msg) { input.setAttribute("aria-invalid", msg ? "true" : "false"); $(input.id + "-err").textContent = msg || ""; }
  els.form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = els.name.value.trim(), phone = els.phone.value.trim(), pc = els.postcode.value.trim().toUpperCase().replace(/\s+/g, " ");
    var digits = phone.replace(/[^\d]/g, "");
    var ok = true;
    if (name.length < 2) { setErr(els.name, "Please enter your name."); ok = false; } else setErr(els.name, "");
    if (digits.length < 10 || digits.length > 13) { setErr(els.phone, "Please enter a mobile number we can call."); ok = false; } else setErr(els.phone, "");
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(pc)) { setErr(els.postcode, "Please enter a full UK postcode, like KT1 1AA."); ok = false; } else setErr(els.postcode, "");
    if (!ok) { var bad = els.form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
    state.details = { name: name, phone: phone, postcode: pc };
    go(state.orig ? "designs" : "photo");
  });

  /* ---------- step 3: photo ---------- */
  function nearestAspect(w, h) {
    var list = ["1:1", "3:2", "2:3", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9"], r = w / h, best = "4:3", d = 9;
    list.forEach(function (a) { var p = a.split(":"), x = Math.abs(Math.log((+p[0] / +p[1]) / r)); if (x < d) { d = x; best = a; } });
    return best;
  }
  function prepare(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) { reject(new Error("type")); return; }
      var done = function (bmp) {
        var max = 1280, w = bmp.width, h = bmp.height, s = Math.min(1, max / Math.max(w, h));
        var cw = Math.round(w * s), ch = Math.round(h * s);
        var c = document.createElement("canvas"); c.width = cw; c.height = ch;
        c.getContext("2d").drawImage(bmp, 0, 0, cw, ch);
        resolve({ url: c.toDataURL("image/jpeg", 0.86), w: cw, h: ch, aspect: nearestAspect(cw, ch) });
      };
      function fallback() {
        var u = URL.createObjectURL(file), im = new Image();
        im.onload = function () { done(im); URL.revokeObjectURL(u); };
        im.onerror = function () { reject(new Error("read")); };
        im.src = u;
      }
      if (window.createImageBitmap) createImageBitmap(file).then(done, fallback); else fallback();
    });
  }
  function photoError(msg) { els.photoErr.textContent = msg || ""; els.photoErr.hidden = !msg; }
  function handle(file) {
    photoError("");
    prepare(file).then(function (p) {
      if (state.ctrl) state.ctrl.abort();
      state.gen++;
      state.sid = uuid(); state.orig = p; state.runs = []; state.used = []; state.chosen = null;
      els.before.src = p.url;
      els.viewer.style.setProperty("--w", p.w); els.viewer.style.setProperty("--h", p.h);
      els.range.value = 40; setPos(40);
      state.ctrl = window.AbortController ? new AbortController() : { signal: undefined, abort: function () {} };
      go("designs");
      newRun();
      check(state.gen);
    }, function () { photoError("That file couldn't be read. Please choose a JPG or PNG photo."); });
  }
  els.file.addEventListener("change", function () { if (els.file.files && els.file.files[0]) handle(els.file.files[0]); els.file.value = ""; });
  ["dragenter", "dragover"].forEach(function (ev) { els.drop.addEventListener(ev, function (e) { e.preventDefault(); els.drop.classList.add("over"); }); });
  ["dragleave", "drop"].forEach(function (ev) { els.drop.addEventListener(ev, function (e) { e.preventDefault(); els.drop.classList.remove("over"); }); });
  els.drop.addEventListener("drop", function (e) { var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if (f) handle(f); });

  /* ---------- designs ---------- */
  function post(body, signal, keepalive) {
    return fetch(CFG.endpoint, {
      method: "POST", signal: signal, keepalive: !!keepalive,
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + CFG.publicKey, "apikey": CFG.publicKey },
      body: JSON.stringify(body)
    });
  }
  function pickStyles() {
    var pool = CFG.styles.filter(function (s) { return state.used.indexOf(s) < 0; });
    if (pool.length < 2) { state.used = []; pool = CFG.styles.slice(); }
    var a = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    var b = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    state.used.push(a, b);
    return { A: a, B: b };
  }
  function newRun() {
    var n = state.runs.length + 1, st = pickStyles();
    var run = { run: n, A: { status: "loading", style: st.A }, B: { status: "loading", style: st.B } };
    state.runs.push(run);
    state.cur = { run: n, v: "A" };
    request(run, "A"); request(run, "B");
    paint();
  }
  function request(run, v) {
    var gen = state.gen, slot = run[v];
    slot.status = "loading"; paint();
    post({ mode: "visualise", image: state.orig.url, mime_type: "image/jpeg", version: v, type: state.type, style: slot.style, run: run.run,
      sid: state.sid, store_original: run.run === 1 && v === "A", aspect: state.orig.aspect, size: CFG.gen.size, think: CFG.gen.think }, state.ctrl.signal)
      .then(function (res) { if (!res.ok) throw new Error("http " + res.status); return res.json(); })
      .then(function (d) {
        if (gen !== state.gen) return;
        if (!d || !d.image) throw new Error("empty");
        slot.status = "ready"; slot.src = "data:" + (d.mime_type || "image/jpeg") + ";base64," + d.image; paint();
      })
      .catch(function (e) {
        if (gen !== state.gen || (e && e.name === "AbortError")) return;
        slot.status = "error"; paint();
      });
  }
  function check(gen) {
    post({ mode: "check", image: state.orig.url, mime_type: "image/jpeg" }, state.ctrl.signal)
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (v) {
        if (gen !== state.gen || !v || v.ok !== false) return;
        if (state.ctrl) state.ctrl.abort();
        state.gen++; state.orig = null; state.runs = [];
        go("photo");
        photoError(v.code === "not_usable"
          ? "We couldn't see the room clearly in that photo. Please use a well-lit shot of the whole bathroom with nobody in it."
          : "That doesn't look like a bathroom. Please add a photo of the bathroom you'd like to renovate.");
      }).catch(function () {});
  }
  function curRun() { return state.runs[state.cur.run - 1]; }
  function setPos(v) { els.viewer.style.setProperty("--pos", v + "%"); }
  els.range.addEventListener("input", function () { setPos(els.range.value); });

  function paint() {
    var run = curRun(); if (!run) return;
    var v = state.cur.v, slot = run[v];
    Array.prototype.forEach.call(root.querySelectorAll(".rvz-ab button"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === v)); });
    els.tagR.textContent = CFG.versions[v].name;
    if (slot.status === "ready") { if (els.after.getAttribute("src") !== slot.src) els.after.src = slot.src; els.after.hidden = false; } else { els.after.hidden = true; }
    els.viewer.classList.toggle("rvz-pending", slot.status !== "ready");
    els.busy.hidden = slot.status !== "loading";
    els.busyTitle.textContent = "Designing " + CFG.versions[v].name;
    els.fail.hidden = slot.status !== "error";
    // sets
    if (state.runs.length > 1) {
      els.sets.hidden = false; els.sets.innerHTML = "<span>Designs</span>";
      state.runs.forEach(function (r) {
        var b = document.createElement("button"); b.type = "button"; b.textContent = "Set " + r.run;
        b.setAttribute("aria-pressed", String(r.run === state.cur.run));
        b.addEventListener("click", function () { state.cur.run = r.run; paint(); });
        els.sets.appendChild(b);
      });
    } else els.sets.hidden = true;
    var busyNow = run.A.status === "loading" || run.B.status === "loading";
    els.more.disabled = busyNow || state.runs.length >= CFG.maxSets;
    els.more.textContent = state.runs.length >= CFG.maxSets ? "You've seen all your designs" : "See two more designs";
    paintDesigns();
  }
  function paintDesigns() {
    var run = curRun(); if (!run || !state.type) return;
    var t = typeBy(state.type);
    els.designs.innerHTML = "";
    ["A", "B"].forEach(function (v) {
      var slot = run[v], meta = CFG.versions[v];
      var card = document.createElement("div");
      card.className = "rvz-design" + (state.cur.v === v ? " sel" : "");
      card.setAttribute("tabindex", "0"); card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Show " + meta.name + ": " + meta.short);
      card.innerHTML = '<span class="rvz-dot" aria-hidden="true"></span><img class="rvz-thumb" alt=""><div class="rvz-design-body"><span class="rvz-design-name"></span><span class="rvz-design-desc"></span><span class="rvz-price"></span></div><button type="button" class="rvz-btn">Book a consultation</button>';
      card.querySelector(".rvz-dot").className = "rvz-dot " + slot.status;
      if (slot.status === "ready") card.querySelector(".rvz-thumb").src = slot.src;
      card.querySelector(".rvz-design-name").textContent = meta.name + " · " + meta.short;
      card.querySelector(".rvz-design-desc").textContent = meta.desc;
      card.querySelector(".rvz-price").textContent = t.name + ": " + priceText(t);
      var btn = card.querySelector(".rvz-btn");
      btn.disabled = slot.status !== "ready";
      btn.setAttribute("aria-label", "Book a consultation for " + meta.name);
      btn.addEventListener("click", function (e) { e.stopPropagation(); book(run.run, v); });
      card.addEventListener("click", function () { state.cur.v = v; paint(); });
      card.addEventListener("keydown", function (e) { if (e.target === card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); state.cur.v = v; paint(); } });
      els.designs.appendChild(card);
    });
  }
  Array.prototype.forEach.call(root.querySelectorAll(".rvz-ab button"), function (b) {
    b.addEventListener("click", function () { state.cur.v = b.getAttribute("data-v"); paint(); });
  });
  els.retry.addEventListener("click", function () { var run = curRun(); if (run) request(run, state.cur.v); });
  els.more.addEventListener("click", function () { if (state.runs.length < CFG.maxSets) newRun(); });
  els.newphoto.addEventListener("click", function () { if (state.ctrl) state.ctrl.abort(); state.gen++; state.orig = null; state.runs = []; photoError(""); go("photo"); });

  /* ---------- book + submit ---------- */
  function waText(run, v) {
    var t = typeBy(state.type), d = state.details;
    return [
      "Hi Alex, I'd like to book a consultation for my bathroom.",
      "",
      "Name: " + d.name,
      "Mobile: " + d.phone,
      "Postcode: " + d.postcode,
      "Bathroom: " + t.name + " (guide price " + priceText(t) + ")",
      "Design I like: Set " + run + ", " + CFG.versions[v].name + " (" + CFG.versions[v].short.toLowerCase() + ")",
      "",
      "My photo and all my designs: " + CFG.enquiryPage + "?id=" + state.sid
    ].join("\n");
  }
  function book(run, v) {
    state.chosen = { run: run, version: v };
    var t = typeBy(state.type), d = state.details;
    var rows = [["Name", d.name], ["Mobile", d.phone], ["Postcode", d.postcode], ["Bathroom", t.name], ["Guide price", priceText(t)], ["Your design", "Set " + run + ", " + CFG.versions[v].name + " (" + CFG.versions[v].short.toLowerCase() + ")"]];
    els.recap.innerHTML = "";
    rows.forEach(function (r) { var dt = document.createElement("dt"), dd = document.createElement("dd"); dt.textContent = r[0]; dd.textContent = r[1]; els.recap.appendChild(dt); els.recap.appendChild(dd); });
    var slot = state.runs[run - 1][v];
    els.recapImg.src = slot.src || "";
    els.send.href = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(waText(run, v));
    go("submit");
  }
  els.send.addEventListener("click", function () {
    var t = typeBy(state.type), d = state.details;
    try {
      post({ mode: "enquire", sid: state.sid,
        details: { name: d.name, phone: d.phone, postcode: d.postcode, type: state.type, typeLabel: t.name, price: priceText(t) },
        chosen: state.chosen,
        runs: state.runs.map(function (r) { return { run: r.run, A: r.A.style, B: r.B.style }; }) }, undefined, true).catch(function () {});
    } catch (e) {}
    setTimeout(function () { go("thanks"); }, 300);
  });
  els.restart.addEventListener("click", function () { go("designs"); });

  go("type", true);
})();
  }
  function mount() {
    var root = document.getElementById("rvz");
    if (!root || root.getAttribute("data-mounted")) return;
    root.setAttribute("data-mounted", "1");
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    var slot = document.getElementById("rvz-mount");
    var holder = document.createElement("div"); holder.innerHTML = HTML;
    while (holder.firstChild) slot.parentNode.insertBefore(holder.firstChild, slot);
    slot.parentNode.removeChild(slot);
    run();
  }
  function start() {
    var root = document.getElementById("rvz");
    if (!root) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); mount(); } }, { rootMargin: "800px 0px" });
      io.observe(root);
    } else mount();
    /* Fallback: mount once the page has finished loading and is idle, so the tool is always ready without touching first load. */
    var later = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 1500); })(mount, { timeout: 4000 }); };
    if (document.readyState === "complete") later(); else window.addEventListener("load", later);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
