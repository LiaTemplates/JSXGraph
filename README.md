<!--
author:  André Dietrich

version: 0.0.1

email:   LiaScript@web.de

edit:    true

logo:    logo.gif

comment: This template allows you to create JSXGraph graphs in LiaScript.

script:  https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js
script:  dist/index.js

@JSX.Graph
<jsx-graph>
@0
</jsx-graph>
@end

@JSX.Graph.withParams
<jsx-graph @0>
@1
</jsx-graph>
@end

@JSX.Script
<script run-once modify="//jsx\n" style="display: block">
const code = `//jsx
@0//jsx
`;

"HTML: <jsx-graph background='false'>" + code + "</jsx-graph>";
</script>
@end

-->

# JSXGraph

    --{{0}}--
JSXGraph is a JavaScript library for interactive geometry, function plotting, charting, and data visualization in a web browser. It is widely used in educational contexts to create dynamic mathematical visualizations.

For more information, visit the [JSXGraph website](https://jsxgraph.org).

- __Try it on LiaScript:__

  https://liascript.github.io/course/?https://raw.githubusercontent.com/liaTemplates/JSXGraph/main/README.md

- __See the project on Github:__

  https://github.com/liaTemplates/JSXGraph

- __Experiment in the LiveEditor:__

  https://liascript.github.io/LiveEditor/?/show/file/https://raw.githubusercontent.com/liaTemplates/JSXGraph/main/README.md

    --{{1}}--
Like with other LiaScript templates, there are three ways to integrate JSXGraph, but the easiest way is to copy the import statement into your project. For more information, see the [Sec. Implementation](#implementation).

                           {{1}}
1. Load the latest macros via (this might cause breaking changes)

   `import: https://raw.githubusercontent.com/liaTemplates/JSXGraph/main/README.md`

   or the current version 0.0.1 via:

   `import: https://raw.githubusercontent.com/LiaTemplates/JSXGraph/0.0.1/README.md`

2. __Copy the definitions into your Project__

3. Clone this repository on GitHub


## `@JSX.Graph`

    --{{0}}--
This is the most common way to create JSXGraph graphs in LiaScript. It allows you to create a JSXGraph board with the default parameters. The board is created with the default bounding box and axis settings. You can use the `@JSX.Graph.withParams` macro to customize the board parameters.

``` javascript @JSX.Graph
JXG.Options.slider.snapValues = [-5, -2, -1, 0, 1, 2, 5];
JXG.Options.slider.snapValueDistance = 0.2;

var a = board.create('slider', [[2, -5], [7, -5], [-5, 1, 5]], { name: 'a' });
var b = board.create('slider', [[2, -6], [7, -6], [-5, 0, 5]], { name: 'b' });
var c = board.create('slider', [[2, -7], [7, -7], [-5, 0, 5]], { name: 'c' });
 
var f = board.create('functiongraph', [(x) => a.Value() * x * x + b.Value() * x + c.Value()]);
 
var txt = board.create('text', [-9, -5,
       () => JXG.Math.Numerics.generatePolynomialTerm([c.Value(), b.Value(), a.Value()], 2, 'x', 2)
], { fontSize: 18 });
```

    --{{1}}--
Optionally, you can also manually change the parameters of the board, therefor the board has to be named `board` and is not newly created, but overwritten. And the element it is placed, is called `jxgbox`:

      {{2}}
``` javascript @JSX.Graph
board = JXG.JSXGraph.initBoard(jxgbox, {axis:true, boundingbox: [-8, 4, 8, -4]});

var s = board.create('slider',[[1,3],[5,3],[1,10,50]],{name:'n',snapWidth:1});
var a = board.create('slider',[[1,2],[5,2],[-10,-3,0]],{name:'start'});
var b = board.create('slider',[[1,1],[5,1],[0,2*Math.PI,10]],{name:'end'});

var f = function(x){ return Math.sin(x); };

var plot = board.create('functiongraph',[f,function(){return a.Value();}, function(){return b.Value();}]);

var os = board.create('riemannsum',[f,
    function(){ return s.Value();}, function(){ return "left";},
    function(){return a.Value();},
    function(){return b.Value();}
    ],
    {fillColor:'#ffff00', fillOpacity:0.3});

board.create('text',[-6,-3,function(){ return 'Sum='+(JXG.Math.Numerics.riemannsum(f,s.Value(),'left',a.Value(),b.Value())).toFixed(4); }]);
```

## `@JSX.Graph.withParams`

    --{{0}}--
This macro allows you to create a JSXGraph board with custom parameters. You can specify the bounding box, axis visibility, and other parameters directly in the macro.


``` javascript @JSX.Graph.withParams(`boundingbox="[-5, 5, 5, -5]" showNavigation="false"`)
var A = [],
    s = [],
    B = [],
    c = [],
    r = [],
    k;
 
var attA = {
    name: '',
    strokeColor: '#7355ff',
    fillColor: '#7355ff'
};
A[0] = board.create('point', [2.5, -3], attA);
A[1] = board.create('point', [2, 4], attA);
A[2] = board.create('point', [-2.5, 3], attA);
A[3] = board.create('point', [-4, -2], attA);
A[4] = board.create('point', [0, -4], attA);
 
for (k = 0; k < 5; k++) {
    s[k] = board.create('segment', [A[k], A[(k + 2) % 5]], {
        strokeColor: 'blue',
        strokeWidth: 1
    });
}
 
var attB = {
    name: '',
    strokeColor: '#EA0000',
    fillColor: '#EA0000'
};
for (k = 0; k < 5; k++) {
    B[k] = board.create('intersection', [s[k], s[(k - 1 + 5) % 5], 0], attB);
}
 
var attC = {
    strokeColor: '#aaaaaa',
    strokeWidth: 1
};
for (k = 0; k < 5; k++) {
    c[k] = board.create('circle', [A[k], B[k], A[(k + 1) % 5]], attC);
}
 
var attR = {
    strokeColor: '#ff0000',
    strokeWidth: 2
};
for (k = 0; k < 5; k++) {
    r[k] = board.create('radicalaxis', [c[k], c[(k - 1 + 5) % 5]], attR);
}
```

---


``` javascript @JSX.Graph.withParams(`boundingbox="[-5, 5, 5, -5]" axis="false" showNavigation="false"`)
JXG.Options.label.autoPosition = true;
JXG.Options.text.useMathJax = true;
JXG.Options.text.fontSize = 16;

var p1 = board.create('point', [-3, -3], {
    name: '\\(p_1\\)'
});
var p2 = board.create('point', [0, 3], {
    name: '\\(p_2\\)'
});
var p3 = board.create('point', [3, -4], {
    name: '\\(p_3\\)'
});
 
var l1 = board.create('arrow', [p1, p2], {
    withLabel: true,
    name: '\\(\\vec{v}\\)',
    label: {
        position: 'bot',
        offset: [-25, 0]
    },
    lastArrow: {
        type: 4,
        size: 8
    }
});
var l2 = board.create('arrow', [p1, p3], {
    withLabel: true,
    name: '\\(\\vec{w}\\)',
    label: {
        position: 'top',
        offset: [25, -25]
    },
    lastArrow: {
        type: 4,
        size: 8
    }
});
var l3 = board.create('arrow', [p2, p3], {});
 
var m1 = board.create('midpoint', [p2, p3], {
    name: '\\(m_1\\)'
});
var m2 = board.create('midpoint', [p1, p3], {
    name: '\\(m_2\\)'
});
var m3 = board.create('midpoint', [p1, p2], {
    name: '\\(m_3\\)'
});
 
var s1 = board.create('segment', [p1, m1], {});
var s2 = board.create('segment', [p2, m2], {});
var s3 = board.create('segment', [p3, m3], {});
 
var s = board.create('intersection', [s1, s2], {
    name: '\\(s\\)'
});
```

## `@JSX.Script`

    --{{0}}--
This macro allows your users to read and modify the code that is used to create the JSXGraph board. It is useful for educational purposes, where you want to show the underlying code and allow users to experiment with it. The difference is indicated by the different background color of the code block. Simply double-click onto the board, to reveal the code and modify it.

``` javascript @JSX.Script
board = JXG.JSXGraph.initBoard(jxgbox, {boundingbox: [-1, 9, 13, -3]});

var s = board.create(
  'slider',
  [
    [4, 7],
    [8, 7],
    [1, 1, 1.5],
  ],
  { name: 'S', strokeColor: 'black', fillColor: 'white' }
)
var f = [
  function () { return (s.Value() * 4.5).toFixed(2) },
  function () { return (s.Value() * -1).toFixed(2) },
  function () { return (s.Value() * 3).toFixed(2) },
  function () { return (s.Value() * 2).toFixed(2) },
  function () { return (s.Value() * -0.5).toFixed(2) },
  function () { return (s.Value() * 5.5).toFixed(2) },
  function () { return (s.Value() * 2.5).toFixed(2) },
  function () { return (s.Value() * -0.75).toFixed(2) },
  function () { return (s.Value() * 3.5).toFixed(2) },
  function () { return (s.Value() * 2).toFixed(2) },
  function () { return (s.Value() * -1.25).toFixed(2) },
]
var chart = board.create('chart', [f], {
  chartStyle: 'bar',
  width: 0.8,
  labels: f,
  colorArray: [
    '#8E1B77',
    '#BE1679',
    '#DC1765',
    '#DA2130',
    '#DB311B',
    '#DF4917',
    '#E36317',
    '#E87F1A',
    '#F1B112',
    '#FCF302',
    '#C1E212',
  ],
})

var dataArr = [4, 1, 3, 2, 5, 6.5, 1.5, 2, 0.5, 1.5, -1]
var chart2 = board.create('chart', dataArr, { chartStyle: 'line,point' })
chart2[0].setAttribute('strokeColor:black', 'strokeWidth:2pt')
for (var i = 0; i < 11; i++) {
  chart2[1][i].setAttribute({
    strokeColor: 'black',
    fillColor: 'white',
    face: '[]',
    size: 4,
    strokeWidth: '2pt',
  })
}
board.unsuspendUpdate()
```

## Implementation

The LiaScript implementation of JSXGraph is based on a custom webcomponent `<jsx-graph>`. See the implementation in [src/index.ts](src/index.ts) for more details.

``` html
script:  dist/index.js

@JSX.Graph
<jsx-graph>
@0
</jsx-graph>
@end

@JSX.Graph.withParams
<jsx-graph @0>
@1
</jsx-graph>
@end

@JSX.Script
<script run-once modify="//jsx\n" style="display: block">
const code = `//jsx
@0//jsx
`;

"HTML: <jsx-graph background='false'>" + code + "</jsx-graph>";
</script>
@end
```