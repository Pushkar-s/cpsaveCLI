#include <bits/stdc++.h>
using namespace std;
 
#define int long long
#define rep(i, a) for (int i = 0; i < (a); i++)
#define repd(i, a) for (int i = (a)-1; i >= 0; i--)
#define reps(i, a, j) for (int i = (j); i < (a); i++)
#define deb(x) cout << #x << " " << x << endl;
#define debs(x) cout << #x << " " << x << " ";
#define deba(x) for (auto _i:x) cout << _i << " "; cout << endl;
#define ms(a) memset(a,0,sizeof(a));
#define mp make_pair
#define eb emplace_back
#define pii pair < int , int >
#define all(a) a.begin(),a.end()
// const int INF = 1e9+7;
/*
 
*/
 
void solve() {
    int n; cin >> n;
    while (n%2 == 0) n/=2;
    if (n != 1) cout << "YES" << endl;
    else cout << "NO" << endl;
}
 
signed main(){
    ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t; cin >> t;
    while (t--) solve();
}