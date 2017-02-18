const content =
`if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    ComponentTree: {
      getClosestInstanceFromNode:
        ReactDOMComponentTree.getClosestInstanceFromNode,
      getNodeFromInstance: function(inst) {
        if (inst._renderedComponent) {
          inst = getHostComponentFromComposite(inst);
        }
        if (inst) {
          return ReactDOMComponentTree.getNodeFromInstance(inst);
        } else {
          return null;
        }
      },
    },
    Mount: ReactMount,
    Reconciler: ReactReconciler,
  });
}`;

export default {
  source: 'https://github.com/facebook/react/blob/master/src/renderers/dom/ReactDOM.js',
  content,
};
