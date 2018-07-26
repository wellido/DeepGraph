var ModelDate = "node {\n" +
"  name: \"GradientDescent/learning_rate\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_3\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_FLOAT\n" +
"        tensor_shape {\n" +
"        }\n" +
"        float_val: 0.1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Shape_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 100\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000d\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/BroadcastGradientArgs\"\n" +
"  op: \"BroadcastGradientArgs\"\n" +
"  input: \"gradients/add_grad/Shape\"\n" +
"  input: \"gradients/add_grad/Shape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"        }\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Shape_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 10\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\n\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/BroadcastGradientArgs\"\n" +
"  op: \"BroadcastGradientArgs\"\n" +
"  input: \"gradients/add_1_grad/Shape\"\n" +
"  input: \"gradients/add_1_grad/Shape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"        }\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Reshape_1_grad/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\n\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/SoftmaxCrossEntropyWithLogits_grad/ExpandDims/dim\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: -1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Reshape_3_grad/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 200\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Maximum/y\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Const_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Const\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Shape_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Prod_1\"\n" +
"  op: \"Prod\"\n" +
"  input: \"gradients/Mean_grad/Shape_1\"\n" +
"  input: \"gradients/Mean_grad/Const_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Maximum\"\n" +
"  op: \"Maximum\"\n" +
"  input: \"gradients/Mean_grad/Prod_1\"\n" +
"  input: \"gradients/Mean_grad/Maximum/y\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 200\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Prod\"\n" +
"  op: \"Prod\"\n" +
"  input: \"gradients/Mean_grad/Shape\"\n" +
"  input: \"gradients/Mean_grad/Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/floordiv\"\n" +
"  op: \"FloorDiv\"\n" +
"  input: \"gradients/Mean_grad/Prod\"\n" +
"  input: \"gradients/Mean_grad/Maximum\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Cast\"\n" +
"  op: \"Cast\"\n" +
"  input: \"gradients/Mean_grad/floordiv\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"DstT\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"SrcT\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Tile/multiples\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 200\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Reshape/shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Const\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_FLOAT\n" +
"        tensor_shape {\n" +
"        }\n" +
"        float_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Fill\"\n" +
"  op: \"Fill\"\n" +
"  input: \"gradients/Shape\"\n" +
"  input: \"gradients/Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/Fill\"\n" +
"  input: \"gradients/Mean_grad/Reshape/shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/Tile\"\n" +
"  op: \"Tile\"\n" +
"  input: \"gradients/Mean_grad/Reshape\"\n" +
"  input: \"gradients/Mean_grad/Tile/multiples\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tmultiples\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Mean_grad/truediv\"\n" +
"  op: \"RealDiv\"\n" +
"  input: \"gradients/Mean_grad/Tile\"\n" +
"  input: \"gradients/Mean_grad/Cast\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Reshape_3_grad/Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/Mean_grad/truediv\"\n" +
"  input: \"gradients/Reshape_3_grad/Shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/SoftmaxCrossEntropyWithLogits_grad/ExpandDims\"\n" +
"  op: \"ExpandDims\"\n" +
"  input: \"gradients/Reshape_3_grad/Reshape\"\n" +
"  input: \"gradients/SoftmaxCrossEntropyWithLogits_grad/ExpandDims/dim\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tdim\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Const\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_2/begin\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub_2/y\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat_1/axis\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat_1/values_0\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: -1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_1/size\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub_1/y\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Shape_2\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\n\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Rank_2\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 2\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub_1\"\n" +
"  op: \"Sub\"\n" +
"  input: \"Rank_2\"\n" +
"  input: \"Sub_1/y\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_1/begin\"\n" +
"  op: \"Pack\"\n" +
"  input: \"Sub_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"N\"\n" +
"    value {\n" +
"      i: 1\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"axis\"\n" +
"    value {\n" +
"      i: 0\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_1\"\n" +
"  op: \"Slice\"\n" +
"  input: \"Shape_2\"\n" +
"  input: \"Slice_1/begin\"\n" +
"  input: \"Slice_1/size\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"Index\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat_1\"\n" +
"  op: \"ConcatV2\"\n" +
"  input: \"concat_1/values_0\"\n" +
"  input: \"Slice_1\"\n" +
"  input: \"concat_1/axis\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"N\"\n" +
"    value {\n" +
"      i: 2\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat/axis\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat/values_0\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: -1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice/size\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub/y\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Shape_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\n\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Rank_1\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 2\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub\"\n" +
"  op: \"Sub\"\n" +
"  input: \"Rank_1\"\n" +
"  input: \"Sub/y\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice/begin\"\n" +
"  op: \"Pack\"\n" +
"  input: \"Sub\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"N\"\n" +
"    value {\n" +
"      i: 1\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"axis\"\n" +
"    value {\n" +
"      i: 0\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice\"\n" +
"  op: \"Slice\"\n" +
"  input: \"Shape_1\"\n" +
"  input: \"Slice/begin\"\n" +
"  input: \"Slice/size\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"Index\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"concat\"\n" +
"  op: \"ConcatV2\"\n" +
"  input: \"concat/values_0\"\n" +
"  input: \"Slice\"\n" +
"  input: \"concat/axis\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"N\"\n" +
"    value {\n" +
"      i: 2\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\n\\000\\000\\000\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Rank\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 2\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Sub_2\"\n" +
"  op: \"Sub\"\n" +
"  input: \"Rank\"\n" +
"  input: \"Sub_2/y\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_2/size\"\n" +
"  op: \"Pack\"\n" +
"  input: \"Sub_2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"N\"\n" +
"    value {\n" +
"      i: 1\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"axis\"\n" +
"    value {\n" +
"      i: 0\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Slice_2\"\n" +
"  op: \"Slice\"\n" +
"  input: \"Shape\"\n" +
"  input: \"Slice_2/begin\"\n" +
"  input: \"Slice_2/size\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"Index\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"logits_biases\"\n" +
"  op: \"VariableV2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"container\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shape\"\n" +
"    value {\n" +
"      shape {\n" +
"        dim {\n" +
"          size: 10\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shared_name\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"logits_biases/read\"\n" +
"  op: \"Identity\"\n" +
"  input: \"logits_biases\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"logits_weights\"\n" +
"  op: \"VariableV2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"container\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shape\"\n" +
"    value {\n" +
"      shape {\n" +
"        dim {\n" +
"          size: 100\n" +
"        }\n" +
"        dim {\n" +
"          size: 10\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shared_name\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"logits_weights/read\"\n" +
"  op: \"Identity\"\n" +
"  input: \"logits_weights\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"hidden_biases\"\n" +
"  op: \"VariableV2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"container\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shape\"\n" +
"    value {\n" +
"      shape {\n" +
"        dim {\n" +
"          size: 100\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shared_name\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"hidden_biases/read\"\n" +
"  op: \"Identity\"\n" +
"  input: \"hidden_biases\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"hidden_weights\"\n" +
"  op: \"VariableV2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 784\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"container\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shape\"\n" +
"    value {\n" +
"      shape {\n" +
"        dim {\n" +
"          size: 784\n" +
"        }\n" +
"        dim {\n" +
"          size: 100\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shared_name\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"hidden_weights/read\"\n" +
"  op: \"Identity\"\n" +
"  input: \"hidden_weights\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 784\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Reshape/shape\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"          dim {\n" +
"            size: 2\n" +
"          }\n" +
"        }\n" +
"        tensor_content: \"\\310\\000\\000\\000\\377\\377\\377\\377\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/one_hot/depth\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 10\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/one_hot/off_value\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_FLOAT\n" +
"        tensor_shape {\n" +
"        }\n" +
"        float_val: 0\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/one_hot/on_value\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_FLOAT\n" +
"        tensor_shape {\n" +
"        }\n" +
"        float_val: 1\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/random_shuffle_queue_DequeueMany/n\"\n" +
"  op: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"dtype\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"value\"\n" +
"    value {\n" +
"      tensor {\n" +
"        dtype: DT_INT32\n" +
"        tensor_shape {\n" +
"        }\n" +
"        int_val: 200\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_1/random_shuffle_queue\"\n" +
"  op: \"RandomShuffleQueueV2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"capacity\"\n" +
"    value {\n" +
"      i: 20000\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"component_types\"\n" +
"    value {\n" +
"      list {\n" +
"        type: DT_FLOAT\n" +
"        type: DT_INT64\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"container\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"min_after_dequeue\"\n" +
"    value {\n" +
"      i: 4000\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"seed\"\n" +
"    value {\n" +
"      i: 0\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"seed2\"\n" +
"    value {\n" +
"      i: 0\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 28\n" +
"          }\n" +
"          dim {\n" +
"            size: 28\n" +
"          }\n" +
"          dim {\n" +
"            size: 1\n" +
"          }\n" +
"        }\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"shared_name\"\n" +
"    value {\n" +
"      s: \"\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/random_shuffle_queue_DequeueMany\"\n" +
"  op: \"QueueDequeueManyV2\"\n" +
"  input: \"mnist_dataset_train_1/random_shuffle_queue\"\n" +
"  input: \"mnist_dataset_train_2/random_shuffle_queue_DequeueMany/n\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          unknown_rank: true\n" +
"        }\n" +
"        shape {\n" +
"          unknown_rank: true\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"component_types\"\n" +
"    value {\n" +
"      list {\n" +
"        type: DT_FLOAT\n" +
"        type: DT_INT64\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"timeout_ms\"\n" +
"    value {\n" +
"      i: -1\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"mnist_dataset_train_2/random_shuffle_queue_DequeueMany\"\n" +
"  input: \"Reshape/shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"MatMul\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"Reshape\"\n" +
"  input: \"hidden_weights/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"add\"\n" +
"  op: \"Add\"\n" +
"  input: \"MatMul\"\n" +
"  input: \"hidden_biases/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Relu\"\n" +
"  op: \"Relu\"\n" +
"  input: \"add\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"MatMul_1\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"Relu\"\n" +
"  input: \"logits_weights/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"add_1\"\n" +
"  op: \"Add\"\n" +
"  input: \"MatMul_1\"\n" +
"  input: \"logits_biases/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Reshape_1\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"add_1\"\n" +
"  input: \"concat\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"mnist_dataset_train_2/one_hot\"\n" +
"  op: \"OneHot\"\n" +
"  input: \"mnist_dataset_train_2/random_shuffle_queue_DequeueMany:1\"\n" +
"  input: \"mnist_dataset_train_2/one_hot/depth\"\n" +
"  input: \"mnist_dataset_train_2/one_hot/on_value\"\n" +
"  input: \"mnist_dataset_train_2/one_hot/off_value\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"TI\"\n" +
"    value {\n" +
"      type: DT_INT64\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          unknown_rank: true\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"axis\"\n" +
"    value {\n" +
"      i: -1\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Reshape_2\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"mnist_dataset_train_2/one_hot\"\n" +
"  input: \"concat_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"SoftmaxCrossEntropyWithLogits\"\n" +
"  op: \"SoftmaxCrossEntropyWithLogits\"\n" +
"  input: \"Reshape_1\"\n" +
"  input: \"Reshape_2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"        }\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/SoftmaxCrossEntropyWithLogits_grad/PreventGradient\"\n" +
"  op: \"PreventGradient\"\n" +
"  input: \"SoftmaxCrossEntropyWithLogits:1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"message\"\n" +
"    value {\n" +
"      s: \"Currently there is no way to take the second derivative of softmax_cross_entropy_with_logits due to the fused  implementation\\'s interaction with tf.gradients()\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/SoftmaxCrossEntropyWithLogits_grad/mul\"\n" +
"  op: \"Mul\"\n" +
"  input: \"gradients/SoftmaxCrossEntropyWithLogits_grad/ExpandDims\"\n" +
"  input: \"gradients/SoftmaxCrossEntropyWithLogits_grad/PreventGradient\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Reshape_1_grad/Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/SoftmaxCrossEntropyWithLogits_grad/mul\"\n" +
"  input: \"gradients/Reshape_1_grad/Shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Sum_1\"\n" +
"  op: \"Sum\"\n" +
"  input: \"gradients/Reshape_1_grad/Reshape\"\n" +
"  input: \"gradients/add_1_grad/BroadcastGradientArgs:1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Reshape_1\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/add_1_grad/Sum_1\"\n" +
"  input: \"gradients/add_1_grad/Shape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Sum\"\n" +
"  op: \"Sum\"\n" +
"  input: \"gradients/Reshape_1_grad/Reshape\"\n" +
"  input: \"gradients/add_1_grad/BroadcastGradientArgs\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/add_1_grad/Sum\"\n" +
"  input: \"gradients/add_1_grad/Shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/tuple/group_deps\"\n" +
"  op: \"NoOp\"\n" +
"  input: \"^gradients/add_1_grad/Reshape\"\n" +
"  input: \"^gradients/add_1_grad/Reshape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/tuple/control_dependency_1\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/add_1_grad/Reshape_1\"\n" +
"  input: \"^gradients/add_1_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/add_1_grad/Reshape_1\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"GradientDescent/update_logits_biases/ApplyGradientDescent\"\n" +
"  op: \"ApplyGradientDescent\"\n" +
"  input: \"logits_biases\"\n" +
"  input: \"GradientDescent/learning_rate\"\n" +
"  input: \"gradients/add_1_grad/tuple/control_dependency_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"use_locking\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_1_grad/tuple/control_dependency\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/add_1_grad/Reshape\"\n" +
"  input: \"^gradients/add_1_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/add_1_grad/Reshape\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_1_grad/MatMul_1\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"Relu\"\n" +
"  input: \"gradients/add_1_grad/tuple/control_dependency\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: true\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_1_grad/MatMul\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"gradients/add_1_grad/tuple/control_dependency\"\n" +
"  input: \"logits_weights/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: true\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_1_grad/tuple/group_deps\"\n" +
"  op: \"NoOp\"\n" +
"  input: \"^gradients/MatMul_1_grad/MatMul\"\n" +
"  input: \"^gradients/MatMul_1_grad/MatMul_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_1_grad/tuple/control_dependency_1\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/MatMul_1_grad/MatMul_1\"\n" +
"  input: \"^gradients/MatMul_1_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/MatMul_1_grad/MatMul_1\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"GradientDescent/update_logits_weights/ApplyGradientDescent\"\n" +
"  op: \"ApplyGradientDescent\"\n" +
"  input: \"logits_weights\"\n" +
"  input: \"GradientDescent/learning_rate\"\n" +
"  input: \"gradients/MatMul_1_grad/tuple/control_dependency_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@logits_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"          dim {\n" +
"            size: 10\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"use_locking\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_1_grad/tuple/control_dependency\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/MatMul_1_grad/MatMul\"\n" +
"  input: \"^gradients/MatMul_1_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/MatMul_1_grad/MatMul\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/Relu_grad/ReluGrad\"\n" +
"  op: \"ReluGrad\"\n" +
"  input: \"gradients/MatMul_1_grad/tuple/control_dependency\"\n" +
"  input: \"Relu\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Sum_1\"\n" +
"  op: \"Sum\"\n" +
"  input: \"gradients/Relu_grad/ReluGrad\"\n" +
"  input: \"gradients/add_grad/BroadcastGradientArgs:1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Reshape_1\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/add_grad/Sum_1\"\n" +
"  input: \"gradients/add_grad/Shape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Sum\"\n" +
"  op: \"Sum\"\n" +
"  input: \"gradients/Relu_grad/ReluGrad\"\n" +
"  input: \"gradients/add_grad/BroadcastGradientArgs\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/Reshape\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"gradients/add_grad/Sum\"\n" +
"  input: \"gradients/add_grad/Shape\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/tuple/group_deps\"\n" +
"  op: \"NoOp\"\n" +
"  input: \"^gradients/add_grad/Reshape\"\n" +
"  input: \"^gradients/add_grad/Reshape_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/tuple/control_dependency_1\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/add_grad/Reshape_1\"\n" +
"  input: \"^gradients/add_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/add_grad/Reshape_1\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"GradientDescent/update_hidden_biases/ApplyGradientDescent\"\n" +
"  op: \"ApplyGradientDescent\"\n" +
"  input: \"hidden_biases\"\n" +
"  input: \"GradientDescent/learning_rate\"\n" +
"  input: \"gradients/add_grad/tuple/control_dependency_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_biases\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"use_locking\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/add_grad/tuple/control_dependency\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/add_grad/Reshape\"\n" +
"  input: \"^gradients/add_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/add_grad/Reshape\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_grad/MatMul_1\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"Reshape\"\n" +
"  input: \"gradients/add_grad/tuple/control_dependency\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: true\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_grad/MatMul\"\n" +
"  op: \"MatMul\"\n" +
"  input: \"gradients/add_grad/tuple/control_dependency\"\n" +
"  input: \"hidden_weights/read\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"          dim {\n" +
"            size: 784\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_a\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"transpose_b\"\n" +
"    value {\n" +
"      b: true\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_grad/tuple/group_deps\"\n" +
"  op: \"NoOp\"\n" +
"  input: \"^gradients/MatMul_grad/MatMul\"\n" +
"  input: \"^gradients/MatMul_grad/MatMul_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"gradients/MatMul_grad/tuple/control_dependency_1\"\n" +
"  op: \"Identity\"\n" +
"  input: \"gradients/MatMul_grad/MatMul_1\"\n" +
"  input: \"^gradients/MatMul_grad/tuple/group_deps\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@gradients/MatMul_grad/MatMul_1\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: -1\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"GradientDescent/update_hidden_weights/ApplyGradientDescent\"\n" +
"  op: \"ApplyGradientDescent\"\n" +
"  input: \"hidden_weights\"\n" +
"  input: \"GradientDescent/learning_rate\"\n" +
"  input: \"gradients/MatMul_grad/tuple/control_dependency_1\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_class\"\n" +
"    value {\n" +
"      list {\n" +
"        s: \"loc:@hidden_weights\"\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 784\n" +
"          }\n" +
"          dim {\n" +
"            size: 100\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"use_locking\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"GradientDescent\"\n" +
"  op: \"NoOp\"\n" +
"  input: \"^GradientDescent/update_hidden_weights/ApplyGradientDescent\"\n" +
"  input: \"^GradientDescent/update_hidden_biases/ApplyGradientDescent\"\n" +
"  input: \"^GradientDescent/update_logits_weights/ApplyGradientDescent\"\n" +
"  input: \"^GradientDescent/update_logits_biases/ApplyGradientDescent\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_2\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Reshape_3\"\n" +
"  op: \"Reshape\"\n" +
"  input: \"SoftmaxCrossEntropyWithLogits\"\n" +
"  input: \"Slice_2\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tshape\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"          dim {\n" +
"            size: 200\n" +
"          }\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"Mean\"\n" +
"  op: \"Mean\"\n" +
"  input: \"Reshape_3\"\n" +
"  input: \"Const\"\n" +
"  device: \"/job:localhost/replica:0/task:0/device:XLA_CPU:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"Tidx\"\n" +
"    value {\n" +
"      type: DT_INT32\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_XlaCluster\"\n" +
"    value {\n" +
"      s: \"cluster_1\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"_output_shapes\"\n" +
"    value {\n" +
"      list {\n" +
"        shape {\n" +
"        }\n" +
"      }\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"keep_dims\"\n" +
"    value {\n" +
"      b: false\n" +
"    }\n" +
"  }\n" +
"}\n" +
"node {\n" +
"  name: \"_send_Mean_0\"\n" +
"  op: \"_Send\"\n" +
"  input: \"Mean\"\n" +
"  device: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"  attr {\n" +
"    key: \"T\"\n" +
"    value {\n" +
"      type: DT_FLOAT\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"client_terminated\"\n" +
"    value {\n" +
"      b: true\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"recv_device\"\n" +
"    value {\n" +
"      s: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"send_device\"\n" +
"    value {\n" +
"      s: \"/job:localhost/replica:0/task:0/cpu:0\"\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"send_device_incarnation\"\n" +
"    value {\n" +
"      i: -5924635994370253548\n" +
"    }\n" +
"  }\n" +
"  attr {\n" +
"    key: \"tensor_name\"\n" +
"    value {\n" +
"      s: \"Mean:0\"\n" +
"    }\n" +
"  }\n" +
"}\n" +
"library {\n" +
"}\n" +
"versions {\n" +
"  producer: 21\n" +
"}\n"