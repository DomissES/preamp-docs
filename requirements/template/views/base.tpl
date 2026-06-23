%setdefault('stylesheet', None)
%setdefault('navigation', False)
%setdefault('is_doc', False)
% if is_doc:
%   tmpRef='../'
% else:
%   tmpRef=''
% end
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{doc_attributes["name"]}}</title>
  <meta charset="utf-8" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="{{baseurl}}{{tmpRef}}template/preamp-doorstop.css" />
  {{! '<link type="text/css" rel="stylesheet" href="%s" />'%(baseurl+tmpRef+'template/'+stylesheet) if stylesheet else "" }}
</head>
<body>
  {{!base}}
</body>
</html>
