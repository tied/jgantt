(function() {
    Zepto(function(b) {
        b('<div class="g4n7t" style="position:absolute;top:0;right:0;bottom:0;left:0;z-index:10;background-color:white"><div id="gantt_here" style="position:absolute;top:0;right:0;bottom:0;left:0"></div></div>').appendTo("body");
        var r = function(a, c) {
                for (var h = "" + a; h.length < c;) h = "0" + h;
                return h
            },
            m = function(a) {
                return "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").indexOf(a) + 1
            },
            s = function(a, c) {
                return a.length == c.length && a.every(function(a, b) {
                    return a === c[b]
                })
            };
        Date.prototype.getWeek =
            function() {
                var a = new Date;
                a.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
                var c = a.getDay();
                0 == c && (c = 7);
                a.setDate(a.getDate() + (4 - c));
                c = a.getFullYear();
                a = Math.floor((a.getTime() - new Date(c, 0, 1, -6)) / 864E5);
                return 1 + Math.floor(a / 7)
            };
        var e = new Date,
            n = e.getTime(),
            k = new Date(e);
        k.setHours(0, 0, 0, 0);
        k.getTime();
        var p = new Date(k);
        p.setDate(k.getDate() - 1);
        var w = p.getTime(),
            t = new Date(k);
        t.setDate(k.getDate() + 1);
        t.getTime();
        var q = [],
            u = [];
        b("div.ghx-issue").each(function() {
            var a = b(this).find(".ghx-extra-field-row"),
                a = b(a[0]).text().replace(/__/, ""); - 1 == u.indexOf(a) && u.push(a)
        });
        var v = [];
        b("div.ghx-issue").each(function() {
            var a = b(this).find(".ghx-extra-field-row");
            if (!(2 > a.length)) {
                var c, h = b(this).find(".ghx-highlighted-field span");
                0 < h.length && (c = b(h[0]).css("background-color"));
                var h = b(this).find(".ghx-summary").attr("title"),
                    k = !1,
                    e = b(a[0]).text().replace(/__/, ""),
                    //Raul change to accept Date-Time fields
                    kk = b(a[1]).text().split(" "),
                    kk2 = b(a[2]).text().split(" "),
                    
                    g, l, d, f = kk[0].split("/");
                !s(f, ["None"]) && (3 == f.length && !isNaN(f[0]) && 0 < m(f[1]) && !isNaN(f[2])) && (g = new Date("20" + f[2], m(f[1]) -
                    1, f[0]), f = r(f[0], 2) + "-" + r(m(f[1]), 2) + "-20" + f[2], l = new Date(g), d = kk2[0].split("/"), !s(d, ["None"]) && (3 == d.length && !isNaN(d[0]) && 0 < m(d[1]) && !isNaN(d[2])) && (l = new Date("20" + d[2], m(d[1]) - 1, d[0])), d = Math.round((l - g) / 864E5), 0 >= d && (d = 10), d += 1, l = new Date(g), l.setDate(g.getDate() + d), a = g.getTime(), g = l.getTime(), l = a > n ? 0 : a <= n && g >= n ? (n - a) / (g - a) : 1, g > w && (k = !0));
                !0 == k && (-1 == v.indexOf(e) && (v.push(e), q.push({
                    id: e,
                    text: e,
                    owner: !0,
                    open: !0
                })), q.push({
                    text: h,
                    start_date: f,
                    duration: d,
                    open: !0,
                    color: c,
                    progress: l,
                    parent: e
                }))
            }
        });
        gantt.config.row_height = 20;
        gantt.config.readonly = !0;
        gantt.config.drag_links = !1;
        gantt.templates.scale_cell_class = function(a) {
            var c = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
                c = ((new Date(e.getFullYear(), e.getMonth(), e.getDate())).getTime() - c.getTime()) / 864E5;
            if (0 == Math.floor(c)) return "gantt_today";
            if (0 == a.getDay() || 6 == a.getDay()) return "gantt_weekend"
        };
        gantt.templates.task_cell_class = function(a, c) {
            var b = [];
            (0 == c.getDay() || 6 == c.getDay()) && b.push("gantt_weekend");
            return b.join(" ")
        };
        gantt.templates.grid_row_class =
            function(a, c, b) {
                if (!0 == b.owner) return "gantt_person_grid"
            };
        gantt.templates.task_class = function(a, b, e) {
            if (!0 == e.owner) return "gantt_person_task"
        };
        gantt.init("gantt_here");
        gantt.parse({
            data: q
        });
        b(".g4n77").remove();
        gantt.showDate(p);
        b('<button style="position:absolute;top:1ex;left:1ex">X</button>').click(function() {
            for (var a = document.getElementsByClassName("g4n7t"); a[0];) a[0].parentNode.removeChild(a[0])
        }).appendTo("div.g4n7t");
        b('<button style="position:absolute;top:1ex;left:18ex">N</button>').click(function() {
            gantt.showDate(p)
        }).appendTo("div.g4n7t")
    })
})();