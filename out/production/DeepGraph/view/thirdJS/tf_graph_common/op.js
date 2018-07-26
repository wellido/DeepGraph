/* Copyright 2017 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
var tf;
(function (tf) {
    var graph;
    (function (graph_1) {
        var op;
        (function (op) {
            /**
             * Whitelist of current Tensorflow ops valid on the TPU
             */
            op.WHITELIST = [
                'Abs',
                'Acosh',
                'Add',
                'AddN',
                'AdjustContrastv2',
                'AdjustHue',
                'AdjustSaturation',
                'All',
                'Angle',
                'Any',
                'ApproximateEqual',
                'ArgMax',
                'ArgMin',
                'Asinh',
                'Assert',
                'AssignAddVariableOp',
                'AssignSubVariableOp',
                'AssignVariableOp',
                'Atan2',
                'Atanh',
                'AvgPool',
                'AvgPool3D',
                'AvgPool3DGrad',
                'AvgPoolGrad',
                'BatchMatMul',
                'BatchToSpace',
                'BatchToSpaceND',
                'BiasAdd',
                'BiasAddGrad',
                'BiasAddV1',
                'BitwiseAnd',
                'BitwiseOr',
                'BroadcastArgs',
                'BroadcastGradientArgs',
                'Cast',
                'Ceil',
                'CheckNumerics',
                'Cholesky',
                'Complex',
                'ComplexAbs',
                'Concat',
                'ConcatOffset',
                'ConcatV2',
                'Conj',
                'Const',
                'ControlTrigger',
                'Conv2D',
                'Conv2DBackpropFilter',
                'Conv2DBackpropInput',
                'Conv3D',
                'Conv3DBackpropFilterV2',
                'Conv3DBackpropInputV2',
                'Cos',
                'Cosh',
                'Cross',
                'CrossReplicaSum',
                'Cumsum',
                'DepthToSpace',
                'DepthwiseConv2dNative',
                'DepthwiseConv2dNativeBackpropFilter',
                'DepthwiseConv2dNativeBackpropInput',
                'Diag',
                'DiagPart',
                'Div',
                'DynamicStitch',
                'Elu',
                'EluGrad',
                'Empty',
                'Equal',
                'Exp',
                'ExpandDims',
                'Expm1',
                'FFT',
                'FFT2D',
                'FFT3D',
                'Fill',
                'Floor',
                'FloorDiv',
                'FloorMod',
                'FusedBatchNorm',
                'FusedBatchNormGrad',
                'FusedBatchNormGradV2',
                'FusedBatchNormV2',
                'Gather',
                'GatherV2',
                'Greater',
                'GreaterEqual',
                'HSVToRGB',
                'IFFT',
                'IFFT2D',
                'IFFT3D',
                'IRFFT',
                'IRFFT2D',
                'IRFFT3D',
                'Identity',
                'IdentityN',
                'If',
                'Imag',
                'InfeedDequeue',
                'InfeedDequeueTuple',
                'InplaceAdd',
                'InplaceUpdate',
                'Inv',
                'Invert',
                'InvertPermutation',
                'IsFinite',
                'IsInf',
                'IsNan',
                'L2Loss',
                'LRN',
                'LRNGrad',
                'LeftShift',
                'Less',
                'LessEqual',
                'LinSpace',
                'Log',
                'Log1p',
                'LogSoftmax',
                'LogicalAnd',
                'LogicalNot',
                'LogicalOr',
                'MatMul',
                'MatrixDiag',
                'MatrixDiagPart',
                'MatrixTriangularSolve',
                'Max',
                'MaxPool',
                'MaxPool3D',
                'MaxPool3DGrad',
                'MaxPoolGrad',
                'MaxPoolGradV2',
                'MaxPoolV2',
                'Maximum',
                'Mean',
                'Min',
                'Minimum',
                'MirrorPad',
                'Mod',
                'Mul',
                'Multinomial',
                'Neg',
                'NoOp',
                'NotEqual',
                'OneHot',
                'OnesLike',
                'OutfeedEnqueue',
                'OutfeedEnqueueTuple',
                'Pack',
                'Pad',
                'PadV2',
                'ParallelDynamicStitch',
                'Pow',
                'PreventGradient',
                'Prod',
                'QuantizeAndDequantizeV2',
                'RFFT',
                'RFFT2D',
                'RFFT3D',
                'RGBToHSV',
                'RandomStandardNormal',
                'RandomUniform',
                'RandomUniformInt',
                'Range',
                'Rank',
                'ReadVariableOp',
                'Real',
                'RealDiv',
                'Reciprocal',
                'ReciprocalGrad',
                'RecvTPUEmbeddingActivations',
                'Relu',
                'Relu6',
                'Relu6Grad',
                'ReluGrad',
                'Reshape',
                'ResizeBilinear',
                'ResizeBilinearGrad',
                'ResourceApplyAdagrad',
                'ResourceApplyAdam',
                'ResourceApplyFtrl',
                'ResourceApplyFtrlV2',
                'ResourceApplyGradientDescent',
                'ResourceApplyMomentum',
                'ResourceApplyRMSProp',
                'ResourceGather',
                'ResourceStridedSliceAssign',
                'Reverse',
                'ReverseSequence',
                'ReverseV2',
                'RightShift',
                'Rint',
                'Round',
                'Rsqrt',
                'RsqrtGrad',
                'Select',
                'Selu',
                'SeluGrad',
                'SendTPUEmbeddingGradients',
                'Shape',
                'ShapeN',
                'Sigmoid',
                'SigmoidGrad',
                'Sign',
                'Sin',
                'Sinh',
                'Size',
                'Slice',
                'Softmax',
                'SoftmaxCrossEntropyWithLogits',
                'Softplus',
                'SoftplusGrad',
                'Softsign',
                'SoftsignGrad',
                'SpaceToBatch',
                'SpaceToBatchND',
                'SpaceToDepth',
                'SparseMatMul',
                'SparseSoftmaxCrossEntropyWithLogits',
                'Split',
                'SplitV',
                'Sqrt',
                'SqrtGrad',
                'Square',
                'SquaredDifference',
                'Squeeze',
                'StackCloseV2',
                'StackPopV2',
                'StackPushV2',
                'StackV2',
                'StatelessRandomNormal',
                'StatelessRandomUniform',
                'StopGradient',
                'StridedSlice',
                'StridedSliceGrad',
                'Sub',
                'Sum',
                'SymbolicGradient',
                'TPUEmbeddingActivations',
                'Tan',
                'Tanh',
                'TanhGrad',
                'TensorArrayCloseV3',
                'TensorArrayConcatV3',
                'TensorArrayGatherV3',
                'TensorArrayGradV3',
                'TensorArrayReadV3',
                'TensorArrayScatterV3',
                'TensorArraySizeV3',
                'TensorArraySplitV3',
                'TensorArrayV3',
                'TensorArrayWriteV3',
                'Tile',
                'Transpose',
                'TruncateDiv',
                'TruncateMod',
                'TruncatedNormal',
                'Unpack',
                'UnsortedSegmentSum',
                'UpdateSlice',
                'VarIsInitializedOp',
                'VariableShape',
                'While',
                'XlaIf',
                'XlaWhile',
                'ZerosLike',
                // Ops below are manually whitelisted and should not be evaluated for
                // compatibility for various reasons.
                // Control flow ops.
                'Enter',
                'Exit',
                'LoopCond',
                'Merge',
                'NextIteration',
                'Switch',
                // Ops below are inserted by the compiler.
                '_Arg',
                '_ParallelConcatUpdate',
                '_Retval',
                '_TPUCompile',
                '_TPUExecute',
                // Distributed TPU ops.
                'TPUReplicatedInput',
                'TPUReplicatedOutput',
                'TPUReplicateMetadata',
                // Checkpointing ops.
                'MergeV2Checkpoints',
                'RestoreV2',
                'SaveV2',
                // Miscellaneous CPU ops.
                'Abort',
                'Assert',
                'Assign',
                'Placeholder',
                'PlaceholderV2',
                'ShardedFilename',
                'StringJoin',
                'Variable',
                'VariableV2',
                'VarHandleOp',
                // Summary ops.
                'AudioSummary',
                'AudioSummaryV2',
                'DebugNumericSummary',
                'HistogramSummary',
                'ImageSummary',
                'MergeSummary',
                'ScalarSummary',
                'StatsAggregatorSummary',
            ];
            /**
             * Returns true if the node's inferred device is not the TPU.
             * Note that this is only a best-effort check.
             */
            function isNotTpuOp(opDevice) {
                if (opDevice.toLowerCase().search('cpu:') != -1) {
                    return true;
                }
                if (opDevice.toLowerCase().search('gpu:') != -1) {
                    return true;
                }
                return (opDevice.toLowerCase().search('tpu') == -1);
            }
            op.isNotTpuOp = isNotTpuOp;
            /**
             * Returns true if OpNode graph object represents a
             * Tensorflow operation that is valid for the TPU.
             */
            function opValid(opNode) {
                // Function library nodes are generally for internal use.
                if (opNode.name.search(graph_1.FUNCTION_LIBRARY_NODE_PREFIX) == 0) {
                    return true;
                }
                // Nodes that lack op types should be ignored.
                if (!opNode.op) {
                    return true;
                }
                // If assigned a device that is not TPU-related assume op is valid.
                if (opNode.device && isNotTpuOp(opNode.device)) {
                    return true;
                }
                // If assigned to the TPU_SYSTEM device, assume op is valid.
                if (opNode.device && opNode.device.search('TPU_SYSTEM') != -1) {
                    return true;
                }
                return op.WHITELIST.indexOf(opNode.op) != -1;
            }
            op.opValid = opValid;
            function checkOpsForCompatibility(graph) {
                _.each(graph.nodes, function (node) {
                    node.compatible = opValid(node);
                    _.each(node.inEmbeddings, function (node) {
                        node.compatible = opValid(node);
                    });
                    _.each(node.outEmbeddings, function (node) {
                        node.compatible = opValid(node);
                    });
                });
            }
            op.checkOpsForCompatibility = checkOpsForCompatibility;
        })(op = graph_1.op || (graph_1.op = {}));
    })(graph = tf.graph || (tf.graph = {}));
})(tf || (tf = {})); // close module tf.graph.op
