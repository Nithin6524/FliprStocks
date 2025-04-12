"use client"

import { Calendar, DollarSign, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EarningsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">AAPL Earnings</h1>
          <p className="text-muted-foreground">Apple Inc. - Financial Performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
          </Button>
          <Button variant="outline" size="sm">
            <DollarSign className="mr-2 h-4 w-4" /> Compare
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md bg-muted p-4">
              <div className="text-sm text-muted-foreground">Next Earnings Date</div>
              <div className="mt-1 text-lg font-bold">Jul 25, 2024</div>
              <div className="mt-1 text-sm text-muted-foreground">After Market Close</div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="text-sm text-muted-foreground">EPS Estimate</div>
              <div className="mt-1 text-lg font-bold">$1.34</div>
              <div className="mt-1 flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-3 w-3" />
                +8.1% YoY
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="text-sm text-muted-foreground">Revenue Estimate</div>
              <div className="mt-1 text-lg font-bold">$84.2B</div>
              <div className="mt-1 flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-3 w-3" />
                +5.3% YoY
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="text-sm text-muted-foreground">Surprise History</div>
              <div className="mt-1 text-lg font-bold">4/4 Beats</div>
              <div className="mt-1 text-sm text-muted-foreground">Last 4 Quarters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quarter</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>EPS Estimate</TableHead>
                <TableHead>EPS Actual</TableHead>
                <TableHead>Surprise</TableHead>
                <TableHead>Revenue Estimate</TableHead>
                <TableHead>Revenue Actual</TableHead>
                <TableHead>Surprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Q2 2024</TableCell>
                <TableCell>May 2, 2024</TableCell>
                <TableCell>$1.51</TableCell>
                <TableCell>$1.53</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +1.3%
                  </div>
                </TableCell>
                <TableCell>$90.5B</TableCell>
                <TableCell>$90.8B</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +0.3%
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Q1 2024</TableCell>
                <TableCell>Feb 1, 2024</TableCell>
                <TableCell>$2.10</TableCell>
                <TableCell>$2.18</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +3.8%
                  </div>
                </TableCell>
                <TableCell>$117.9B</TableCell>
                <TableCell>$119.6B</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +1.4%
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Q4 2023</TableCell>
                <TableCell>Nov 2, 2023</TableCell>
                <TableCell>$1.39</TableCell>
                <TableCell>$1.46</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +5.0%
                  </div>
                </TableCell>
                <TableCell>$89.3B</TableCell>
                <TableCell>$89.5B</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +0.2%
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Q3 2023</TableCell>
                <TableCell>Aug 3, 2023</TableCell>
                <TableCell>$1.19</TableCell>
                <TableCell>$1.26</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +5.9%
                  </div>
                </TableCell>
                <TableCell>$81.7B</TableCell>
                <TableCell>$81.8B</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +0.1%
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Q2 2023</TableCell>
                <TableCell>May 4, 2023</TableCell>
                <TableCell>$1.43</TableCell>
                <TableCell>$1.52</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +6.3%
                  </div>
                </TableCell>
                <TableCell>$92.9B</TableCell>
                <TableCell>$94.8B</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +2.0%
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="income">
            <TabsList className="mb-4">
              <TabsTrigger value="income">Income Statement</TabsTrigger>
              <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cash">Cash Flow</TabsTrigger>
            </TabsList>
            <TabsContent value="income">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item (in millions)</TableHead>
                    <TableHead>Q2 2024</TableHead>
                    <TableHead>Q1 2024</TableHead>
                    <TableHead>Q4 2023</TableHead>
                    <TableHead>Q3 2023</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Revenue</TableCell>
                    <TableCell>$90,846</TableCell>
                    <TableCell>$119,575</TableCell>
                    <TableCell>$89,498</TableCell>
                    <TableCell>$81,797</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +4.2%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cost of Revenue</TableCell>
                    <TableCell>$49,783</TableCell>
                    <TableCell>$65,831</TableCell>
                    <TableCell>$49,363</TableCell>
                    <TableCell>$45,336</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        +5.1%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gross Profit</TableCell>
                    <TableCell>$41,063</TableCell>
                    <TableCell>$53,744</TableCell>
                    <TableCell>$40,135</TableCell>
                    <TableCell>$36,461</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +3.1%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Operating Expenses</TableCell>
                    <TableCell>$13,842</TableCell>
                    <TableCell>$14,315</TableCell>
                    <TableCell>$13,473</TableCell>
                    <TableCell>$13,153</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        +2.7%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Operating Income</TableCell>
                    <TableCell>$27,221</TableCell>
                    <TableCell>$39,429</TableCell>
                    <TableCell>$26,662</TableCell>
                    <TableCell>$23,308</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +3.3%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Net Income</TableCell>
                    <TableCell>$23,643</TableCell>
                    <TableCell>$33,916</TableCell>
                    <TableCell>$22,956</TableCell>
                    <TableCell>$19,881</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +3.9%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EPS (Diluted)</TableCell>
                    <TableCell>$1.53</TableCell>
                    <TableCell>$2.18</TableCell>
                    <TableCell>$1.46</TableCell>
                    <TableCell>$1.26</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +4.8%
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="balance">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item (in millions)</TableHead>
                    <TableHead>Q2 2024</TableHead>
                    <TableHead>Q1 2024</TableHead>
                    <TableHead>Q4 2023</TableHead>
                    <TableHead>Q3 2023</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Total Assets</TableCell>
                    <TableCell>$353,545</TableCell>
                    <TableCell>$355,120</TableCell>
                    <TableCell>$352,583</TableCell>
                    <TableCell>$335,025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +5.5%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Current Assets</TableCell>
                    <TableCell>$143,728</TableCell>
                    <TableCell>$148,622</TableCell>
                    <TableCell>$143,997</TableCell>
                    <TableCell>$134,836</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +6.6%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Non-Current Assets</TableCell>
                    <TableCell>$209,817</TableCell>
                    <TableCell>$206,498</TableCell>
                    <TableCell>$208,586</TableCell>
                    <TableCell>$200,189</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +4.8%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Liabilities</TableCell>
                    <TableCell>$290,455</TableCell>
                    <TableCell>$292,764</TableCell>
                    <TableCell>$290,442</TableCell>
                    <TableCell>$277,250</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +4.8%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Current Liabilities</TableCell>
                    <TableCell>$125,850</TableCell>
                    <TableCell>$127,435</TableCell>
                    <TableCell>$125,606</TableCell>
                    <TableCell>$118,150</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +6.5%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Non-Current Liabilities</TableCell>
                    <TableCell>$164,605</TableCell>
                    <TableCell>$165,329</TableCell>
                    <TableCell>$164,836</TableCell>
                    <TableCell>$159,100</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +3.5%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shareholders' Equity</TableCell>
                    <TableCell>$63,090</TableCell>
                    <TableCell>$62,356</TableCell>
                    <TableCell>$62,141</TableCell>
                    <TableCell>$57,775</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +9.2%
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="cash">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item (in millions)</TableHead>
                    <TableHead>Q2 2024</TableHead>
                    <TableHead>Q1 2024</TableHead>
                    <TableHead>Q4 2023</TableHead>
                    <TableHead>Q3 2023</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Operating Cash Flow</TableCell>
                    <TableCell>$28,625</TableCell>
                    <TableCell>$39,856</TableCell>
                    <TableCell>$29,891</TableCell>
                    <TableCell>$26,359</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +8.6%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Investing Cash Flow</TableCell>
                    <TableCell>-$3,245</TableCell>
                    <TableCell>-$9,756</TableCell>
                    <TableCell>-$3,125</TableCell>
                    <TableCell>-$2,987</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        +8.6%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Financing Cash Flow</TableCell>
                    <TableCell>-$24,351</TableCell>
                    <TableCell>-$27,124</TableCell>
                    <TableCell>-$24,103</TableCell>
                    <TableCell>-$22,562</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        +7.9%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Net Change in Cash</TableCell>
                    <TableCell>$1,029</TableCell>
                    <TableCell>$2,976</TableCell>
                    <TableCell>$2,663</TableCell>
                    <TableCell>$810</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +27.0%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Free Cash Flow</TableCell>
                    <TableCell>$25,380</TableCell>
                    <TableCell>$30,100</TableCell>
                    <TableCell>$26,766</TableCell>
                    <TableCell>$23,372</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +8.6%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Capital Expenditures</TableCell>
                    <TableCell>-$3,245</TableCell>
                    <TableCell>-$9,756</TableCell>
                    <TableCell>-$3,125</TableCell>
                    <TableCell>-$2,987</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        +8.6%
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cash and Equivalents</TableCell>
                    <TableCell>$29,965</TableCell>
                    <TableCell>$28,936</TableCell>
                    <TableCell>$25,960</TableCell>
                    <TableCell>$23,297</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        +28.6%
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
