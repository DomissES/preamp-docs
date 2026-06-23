%setdefault('has_index', True)
%setdefault('has_matrix', True)
%setdefault('toc', None)
% import datetime
% rebase('base.tpl')
% if is_doc:
%   tmpRef='../'
% else:
%   tmpRef=''
% end
% issue = "{}{}".format(doc_attributes["major"], doc_attributes["minor"])
% creation_date = datetime.date.today().isoformat()
<div class="app-shell">
  <header class="app-header">
    <div class="header-inner">
      <button class="icon-button sidebar-control" type="button" data-toggle-sidebar aria-controls="tocSidebar" aria-expanded="true" title="Toggle contents">
        <span class="button-lines" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="sr-only">Toggle contents</span>
      </button>
      % if has_index:
      <a class="brand" href="{{tmpRef}}index.html" aria-label="Document index">
      % else:
      <a class="brand" href="#mainContent" aria-label="Document start">
      % end
        <img src="{{baseurl}}{{tmpRef}}template/template_icon.png" alt="" />
      </a>
      <div class="title-block">
        <span class="document-code">{{doc_attributes["name"]}}</span>
        <div class="document-title">{{!doc_attributes["title"]}}</div>
      </div>
      <form class="metadata-panel" aria-label="Document metadata">
        <label class="metadata-field">
          <span>Ref</span>
          <input type="text" value="{{doc_attributes["ref"]}}" readonly />
        </label>
        <label class="metadata-field">
          <span>By</span>
          <input type="text" value="{{doc_attributes["by"]}}" readonly />
        </label>
        <label class="metadata-field">
          <span>Issue</span>
          <input type="text" value="{{issue}}" readonly />
        </label>
      </form>
    </div>
  </header>

  <div class="app-layout">
    <aside class="app-sidebar" id="tocSidebar">
      <div class="sidebar-panel">
        <div class="sidebar-heading">
          <span>Contents</span>
          % if toc:
          <button class="text-button" type="button" data-collapse-all>Collapse all</button>
          % end
        </div>
        % if toc:
        <nav class="toc-list" data-toc-flat aria-label="Contents">
          % for item in toc:
          <a class="toc-link" data-depth="{{item['depth']}}" href="#{{item['uid']}}">{{item['text']}}</a>
          % end
        </nav>
        % else:
        <p class="toc-empty">No contents</p>
        % end
      </div>
    </aside>

    <main class="app-main" id="mainContent">
      <section class="document-panel">
        <div class="document-content">
          {{!body}}
        </div>
      </section>
    </main>
  </div>

  <footer class="app-footer">
    created by &lt;domissES&gt; on {{creation_date}}
  </footer>
</div>
<script src="{{baseurl}}{{tmpRef}}template/preamp-doorstop.js"></script>
