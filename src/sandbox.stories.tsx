import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Chip,
  Table,
  Divider,
  FAB,
  Grid,
  GridItem,
  IconButton,
  List,
  Searchbar,
  Snackbar,
  Surface,
  Switch,
  Typography,
  TextField,
} from ".";
import type { DataWithId } from "./Table/types";

const meta: Meta = {
  title: "Sandbox/Application Examples",
  parameters: {
    docs: {
      autodocs: false,
    },
  },
};

export default meta;

type Story = StoryObj;

export const UserProfileApp: Story = {
  render: () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="プロフィール" />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          {/* プロフィールセクション */}
          <Surface style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <Avatar source="https://picsum.photos/200" />
              <View style={styles.profileInfo}>
                <Typography variant="headlineSmall">春日部つむぎ</Typography>
                <Typography variant="bodyMedium" style={styles.subtitle}>
                  ハイパー埼玉ギャル
                </Typography>
                <View style={styles.chipContainer}>
                  <Chip mode="outlined" compact>
                    フォロワー 1.2K
                  </Chip>
                  <Chip mode="outlined" compact style={styles.chipSpacing}>
                    フォロー中 234
                  </Chip>
                </View>
              </View>
            </View>
            <Button variant="filled" style={styles.editButton}>
              プロフィールを編集
            </Button>
          </Surface>

          {/* 検索バー */}
          <Searchbar
            placeholder="投稿を検索..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          {/* 設定セクション */}
          <Card style={styles.settingsCard}>
            <Card.Title title="設定" />
            <Card.Content>
              <List.Item
                title="通知"
                description="プッシュ通知を受け取る"
                left={(props) => <List.Icon {...props} icon="bell" />}
                right={() => (
                  <Switch
                    selected={notificationsEnabled}
                    onPress={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                  />
                )}
              />
              <Divider />
              <List.Item
                title="プライバシー"
                description="プライバシー設定を管理"
                left={(props) => <List.Icon {...props} icon="shield-account" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setSnackbarVisible(true)}
              />
              <Divider />
              <List.Item
                title="アカウント"
                description="アカウント情報を編集"
                left={(props) => <List.Icon {...props} icon="account-cog" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setSnackbarVisible(true)}
              />
            </Card.Content>
          </Card>

          {/* アクティビティセクション */}
          <Card style={styles.activityCard}>
            <Card.Title title="最近のアクティビティ" />
            <Card.Content>
              <List.Item
                title="新しい投稿にいいね"
                description="2時間前"
                left={(props) => <List.Icon {...props} icon="heart" />}
              />
              <List.Item
                title="フォロワーが増えました"
                description="5時間前"
                left={(props) => <List.Icon {...props} icon="account-plus" />}
              />
              <List.Item
                title="コメントを投稿"
                description="1日前"
                left={(props) => <List.Icon {...props} icon="comment" />}
              />
            </Card.Content>
          </Card>
        </ScrollView>

        <FAB icon="plus" onPress={() => setSnackbarVisible(true)} />

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          機能が実装されました！
        </Snackbar>
      </View>
    );
  },
};

export const ShoppingApp: Story = {
  render: () => {
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const addToCart = () => {
      setCartCount(cartCount + 1);
      setSnackbarVisible(true);
    };

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="ショップ" />
          <Appbar.Action icon="cart" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          <Searchbar
            placeholder="商品を検索..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          {/* カテゴリーチップ */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            <Chip mode="flat" selected style={styles.categoryChip}>
              すべて
            </Chip>
            <Chip mode="outlined" style={styles.categoryChip}>
              ファッション
            </Chip>
            <Chip mode="outlined" style={styles.categoryChip}>
              エレクトロニクス
            </Chip>
            <Chip mode="outlined" style={styles.categoryChip}>
              ホーム
            </Chip>
            <Chip mode="outlined" style={styles.categoryChip}>
              スポーツ
            </Chip>
          </ScrollView>

          {/* 商品リスト - Grid Layout使用 */}
          <Grid variant="standard" spacing="comfortable">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GridItem key={item} span={6}>
                <Card>
                  <Card.Cover
                    source={{
                      uri: `https://picsum.photos/200/150?random=${item}`,
                    }}
                  />
                  <Card.Content style={styles.productContent}>
                    <Typography variant="titleMedium">商品 {item}</Typography>
                    <Typography
                      variant="bodySmall"
                      style={styles.productDescription}
                    >
                      高品質な商品の説明文がここに入ります
                    </Typography>
                    <Typography variant="titleLarge" style={styles.price}>
                      ¥{(item * 1000).toLocaleString()}
                    </Typography>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={addToCart}>カートに追加</Button>
                    <IconButton icon="heart-outline" onPress={() => {}} />
                  </Card.Actions>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          action={{
            label: "カートを見る",
            onPress: () => {},
          }}
        >
          商品をカートに追加しました
        </Snackbar>
      </View>
    );
  },
};

export const TaskManagerApp: Story = {
  render: () => {
    const [tasks, setTasks] = useState([
      {
        id: 1,
        title: "プロジェクトの企画書作成",
        completed: false,
        priority: "high",
      },
      {
        id: 2,
        title: "チームミーティング",
        completed: true,
        priority: "medium",
      },
      { id: 3, title: "コードレビュー", completed: false, priority: "high" },
      { id: 4, title: "ドキュメント更新", completed: false, priority: "low" },
    ]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [showCompleted, setShowCompleted] = useState(true);

    const toggleTask = (id: number) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    };

    const addTask = () => {
      if (newTaskTitle.trim()) {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            title: newTaskTitle,
            completed: false,
            priority: "medium",
          },
        ]);
        setNewTaskTitle("");
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "#f44336";
        case "medium":
          return "#ff9800";
        case "low":
          return "#4caf50";
        default:
          return "#9e9e9e";
      }
    };

    const filteredTasks = showCompleted
      ? tasks
      : tasks.filter((task) => !task.completed);

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="タスク管理" />
          <Appbar.Action icon="filter-variant" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          {/* 新しいタスク追加 */}
          <Card style={styles.addTaskCard}>
            <Card.Content>
              <TextField
                label="新しいタスク"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                endAdornment={{
                  type: "icon",
                  value: "plus",
                }}
                onSubmitEditing={addTask}
              />
            </Card.Content>
          </Card>

          {/* フィルターオプション */}
          <Surface style={styles.filterSection}>
            <List.Item
              title="完了済みタスクを表示"
              right={() => (
                <Switch
                  selected={showCompleted}
                  onPress={() => setShowCompleted(!showCompleted)}
                />
              )}
            />
          </Surface>

          {/* タスクリスト */}
          <Card style={styles.taskListCard}>
            <Card.Title title={`タスク (${filteredTasks.length})`} />
            <Card.Content>
              {filteredTasks.map((task) => (
                <View key={task.id}>
                  <List.Item
                    title={task.title}
                    titleStyle={{
                      textDecorationLine: task.completed
                        ? "line-through"
                        : "none",
                      opacity: task.completed ? 0.6 : 1,
                    }}
                    left={() => (
                      <View style={styles.taskLeft}>
                        <IconButton
                          icon={
                            task.completed ? "check-circle" : "circle-outline"
                          }
                          onPress={() => toggleTask(task.id)}
                        />
                        <View
                          style={[
                            styles.priorityIndicator,
                            {
                              backgroundColor: getPriorityColor(task.priority),
                            },
                          ]}
                        />
                      </View>
                    )}
                    right={() => (
                      <IconButton icon="dots-vertical" onPress={() => {}} />
                    )}
                  />
                  <Divider />
                </View>
              ))}
            </Card.Content>
          </Card>
        </ScrollView>

        <FAB icon="plus" onPress={() => {}} />
      </View>
    );
  },
};

export const DashboardApp: Story = {
  render: () => {
    const [stats] = useState([
      {
        title: "総売上",
        value: "¥1,234,567",
        change: "+12.5%",
        color: "#4caf50",
      },
      { title: "新規顧客", value: "156", change: "+8.2%", color: "#2196f3" },
      { title: "注文数", value: "89", change: "-2.1%", color: "#ff9800" },
      { title: "在庫数", value: "1,234", change: "+5.7%", color: "#9c27b0" },
    ]);

    type Order = DataWithId & {
      orderId: string;
      customerName: string;
      amount: string;
      status: string;
      statusColor: string;
    };

    const sampleOrders: Order[] = [
      {
        id: "1",
        orderId: "#1234",
        customerName: "田中太郎",
        amount: "¥12,000",
        status: "配送中",
        statusColor: "#e3f2fd",
      },
      {
        id: "2",
        orderId: "#1235",
        customerName: "佐藤花子",
        amount: "¥8,500",
        status: "処理中",
        statusColor: "#fff3e0",
      },
      {
        id: "3",
        orderId: "#1236",
        customerName: "鈴木一郎",
        amount: "¥15,200",
        status: "完了",
        statusColor: "#e8f5e8",
      },
    ];

    const columnHelper = createColumnHelper<Order>();

    const orderColumns: ColumnDef<DataWithId, unknown>[] = [
      columnHelper.accessor("orderId", {
        header: "注文ID",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        id: "orderId",
      }),
      columnHelper.accessor("customerName", {
        header: "顧客名",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        id: "customerName",
      }),
      columnHelper.accessor("amount", {
        header: "金額",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        id: "amount",
        meta: {
          numeric: true,
        },
      }),
      columnHelper.accessor("status", {
        header: "ステータス",
        cell: (info) => (
          <Chip
            mode="outlined"
            compact
            style={{ backgroundColor: info.row.original.statusColor }}
          >
            {info.getValue()}
          </Chip>
        ),
        id: "status",
      }),
    ] as ColumnDef<DataWithId, unknown>[];

    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 3,
    });

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="ダッシュボード" />
          <Appbar.Action icon="refresh" onPress={() => {}} />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          {/* 統計カード - レスポンシブGrid */}
          <Grid variant="standard" spacing="comfortable">
            {stats.map((stat) => (
              <GridItem key={JSON.stringify(stat)} span={6}>
                <Card style={styles.statCard}>
                  <Card.Content>
                    <Typography variant="bodySmall" style={styles.statLabel}>
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="headlineMedium"
                      style={styles.statValue}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      style={[
                        styles.statChange,
                        {
                          color: stat.change.startsWith("+")
                            ? "#4caf50"
                            : "#f44336",
                        },
                      ]}
                    >
                      {stat.change}
                    </Typography>
                  </Card.Content>
                </Card>
              </GridItem>
            ))}
          </Grid>

          {/* メインコンテンツエリア - 異なるspan使用 */}
          <Grid
            variant="standard"
            spacing="comfortable"
            style={styles.mainGrid}
          >
            {/* 大きなチャートエリア */}
            <GridItem span={8}>
              <Card style={styles.chartCard}>
                <Card.Title title="売上推移" />
                <Card.Content>
                  <View style={styles.chartPlaceholder}>
                    <Typography variant="bodyLarge" style={styles.chartText}>
                      📊 チャートエリア
                    </Typography>
                    <Typography
                      variant="bodyMedium"
                      style={styles.chartSubtext}
                    >
                      ここに売上グラフが表示されます
                    </Typography>
                  </View>
                </Card.Content>
              </Card>
            </GridItem>

            {/* サイドバー情報 */}
            <GridItem span={4}>
              <Card style={styles.sideCard}>
                <Card.Title title="最近の活動" />
                <Card.Content>
                  <List.Item
                    title="新規注文"
                    description="5分前"
                    left={(props) => <List.Icon {...props} icon="shopping" />}
                  />
                  <Divider />
                  <List.Item
                    title="在庫アラート"
                    description="10分前"
                    left={(props) => <List.Icon {...props} icon="alert" />}
                  />
                  <Divider />
                  <List.Item
                    title="顧客登録"
                    description="15分前"
                    left={(props) => (
                      <List.Icon {...props} icon="account-plus" />
                    )}
                  />
                </Card.Content>
              </Card>
            </GridItem>
          </Grid>

          {/* 下部エリア - フル幅 */}
          <Grid variant="standard" spacing="comfortable">
            <GridItem span={12}>
              <Card style={styles.tableCard}>
                <Card.Title title="最近の注文" />
                <Card.Content>
                  <Table
                    data={sampleOrders}
                    columns={orderColumns}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    striped
                  />
                </Card.Content>
              </Card>
            </GridItem>
          </Grid>
        </ScrollView>

        <FAB icon="plus" onPress={() => {}} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
  },
  chipSpacing: {
    marginLeft: 8,
  },
  editButton: {
    marginTop: 8,
  },
  searchbar: {
    marginBottom: 16,
  },
  settingsCard: {
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    marginBottom: 16,
  },
  productContent: {
    paddingBottom: 8,
  },
  productDescription: {
    opacity: 0.7,
    marginVertical: 4,
  },
  price: {
    fontWeight: "bold",
    color: "#e91e63",
  },
  addTaskCard: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
    borderRadius: 12,
  },
  taskListCard: {
    marginBottom: 16,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginLeft: 8,
  },
  statCard: {
    marginBottom: 8,
  },
  statLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  statValue: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  statChange: {
    fontWeight: "500",
  },
  mainGrid: {
    marginTop: 16,
  },
  chartCard: {
    height: 200,
  },
  chartPlaceholder: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  chartText: {
    fontSize: 24,
    marginBottom: 8,
  },
  chartSubtext: {
    opacity: 0.7,
  },
  sideCard: {
    height: 200,
  },
  tableCard: {
    marginTop: 16,
  },
});
